/* eslint-disable @typescript-eslint/no-unused-vars */
import { PasswordService } from './../../user/services/password.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenBodyDto, SingInBodyDto } from '../dtos/auth.dto';
import { CrudUserService } from 'src/user/services/crudUser.service';
import { INVALID_ACCESS_DATA_MESSAGE } from '../constants/messages.constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadModel } from '../models/auth.model';
import { AccessSessionsService } from './accessSessions.service';
import * as uuid from 'uuid';
import { NOT_FOUND_RESPONSE } from 'src/shared/constants/response.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly crudUserService: CrudUserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly accessSessionsService: AccessSessionsService,
  ) {}
  async signIn(body: SingInBodyDto) {
    const userExists = await this.crudUserService.findOneByParams(
      {
        where: { email: body.email },
        relations: 'roles',
      },
      true,
    );

    const passwordMatch = await this.passwordService.compare(
      body.password,
      userExists.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException(INVALID_ACCESS_DATA_MESSAGE);
    }
    const tokens = this.generateTokens({
      email: userExists.email,
      identification: userExists.identification,
      sub: userExists.id,
    });
    const accessSessionId = await this.accessSessionsService.generateSession({
      userId: userExists.id,
      accessToken: tokens.accessToken,
      id: uuid.v4(),
    });
    return {
      tokens: { ...tokens },
      user: {
        email: userExists.email,
        id: userExists.id,
        role: userExists.role,
      },
      session: {
        accessSessionId,
      },
    };
  }

  async signOut({
    userId,
    accessToken,
    accessSessionId,
  }: {
    userId: string;
    accessToken: string;
    accessSessionId: string;
  }): Promise<void> {
    const sessionExists = await this.accessSessionsService.findOneByParams({
      userId,
      accessToken,
      id: accessSessionId,
    });
    console.log(sessionExists);

    if (!sessionExists) {
      throw new NotFoundException(NOT_FOUND_RESPONSE);
    }
    await this.accessSessionsService.delete(sessionExists.id);
  }

  generateTokens(payload: TokenPayloadModel): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.expiresIn'),
      secret: this.configService.get<string>('jwt.secret'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'),
      secret: this.configService.get<string>('jwt.secret'),
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(body: RefreshTokenBodyDto) {
    let paiload;

    try {
      paiload = this.jwtService.verify(body.refreshToken, {
        secret: this.configService.get<string>('jwt.secret'),
      });
    } catch (_e) {
      throw new UnauthorizedException();
    }

    const user = await this.validateSession({
      userId: paiload.sub,
      refreshToken: body.refreshToken,
    });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }
    const tokens = this.generateTokens({
      email: user.email,
      identification: user.identification,
      sub: user.id,
    });
    return {
      tokens: { ...tokens },
      user: {
        email: user.email,
        id: user.id,
      },
    };
  }

  async validateSession({
    userId,
    token,
    refreshToken,
  }: {
    userId: string;
    token?: string;
    refreshToken?: string;
  }) {
    const user = await this.crudUserService.findOneByParams({
      where: { id: userId },
    });
    let payload;
    try {
      payload = this.jwtService.verify(token ?? refreshToken, {
        secret: this.configService.get<string>('jwt.secret'),
      });
    } catch (_e) {
      throw new UnauthorizedException();
    }
    if (!user) {
      return null;
    }
    const sessionActive = await this.accessSessionsService.findOneByParams({
      userId,
      accessToken: token,
    });

    if (!sessionActive && token) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
