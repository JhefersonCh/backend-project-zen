import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { AuthUseCase } from './useCases/auth.UC';
import { AuthService } from './services/auth.service';
import { PasswordService } from 'src/user/services/password.service';
import { CrudUserService } from 'src/user/services/crudUser.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AccessSessionsService } from './services/accessSessions.service';
import { AccessSessionsRepository } from 'src/shared/repositories/accessSessions.repository';

@Module({
  imports: [
    SharedModule.forRoot(),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [],
  providers: [
    AuthUseCase,
    AuthService,
    PasswordService,
    CrudUserService,
    JwtService,
    UserRepository,
    AccessSessionsService,
    AccessSessionsRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
