import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    SharedModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
