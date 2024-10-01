import { Injectable } from '@nestjs/common';
import {
  RefreshTokenBodyDto,
  SignOutBodyDto,
  SingInBodyDto,
} from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthUseCase {
  constructor(private readonly authService: AuthService) {}

  async signIn(body: SingInBodyDto) {
    return await this.authService.signIn(body);
  }

  async signOut(body: SignOutBodyDto) {
    return await this.authService.signOut(body);
  }

  async refreshToken(body: RefreshTokenBodyDto) {
    return await this.authService.refreshToken(body);
  }
}
