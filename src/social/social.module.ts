import { CommentsRepository } from './../shared/repositories/comments.repository';
import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { CommentsUseCase } from './useCases/comments.UC';
import { CommentsService } from './services/comments.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CommentsController],
  providers: [CommentsUseCase, CommentsService, CommentsRepository],
  exports: [],
})
export class SocialModule {}
