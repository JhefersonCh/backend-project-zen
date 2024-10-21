import { Injectable } from '@nestjs/common';
import { MembersService } from '../services/members.service';
import { UpdateMemberToProjectDto } from '../dtos/projects.dto';

@Injectable()
export class MembersUseCase {
  constructor(private readonly _membersService: MembersService) {}

  async getRelatedData() {
    return this._membersService.getRelatedData();
  }

  async getAllMembersByProjectId(projectId: number) {
    return await this._membersService.getAllByParams({
      where: { projectId: projectId },
    });
  }

  async update(body: UpdateMemberToProjectDto) {
    return await this._membersService.update(body);
  }
}
