import { Injectable } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileUseCase {
  constructor(private readonly profileService: ProfileService) {}

  async getStatistics(userId: string) {
    return await this.profileService.getStatistics(userId);
  }
}
