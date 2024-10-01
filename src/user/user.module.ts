import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CrudUserService } from './services/crudUser.service';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { CrudUserUseCase } from './useCases/crudUser.UC';
import { PasswordService } from './services/password.service';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [
    CrudUserService,
    UserRepository,
    CrudUserUseCase,
    PasswordService,
    JwtService,
  ],
})
export class UserModule {}
