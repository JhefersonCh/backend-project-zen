import { Injectable } from '@nestjs/common';
import { MembersService } from '../services/members.service';

@Injectable()
export class MembersUseCase {
  constructor(private readonly _membersService: MembersService) {}

  async getRelatedData() {
    return this._membersService.getRelatedData();
  }
}
