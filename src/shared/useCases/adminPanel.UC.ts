import { Injectable } from '@nestjs/common';
import { AdminPanelService } from '../service/adminPanel.service';
import {
  BaseAdminPanelElementDto,
  UpdateAdminPanelElementDto,
} from '../dtos/adminPanel.dto';

@Injectable()
export class AdminPanelUseCase {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  async getAdminPanelInfo(userId: string) {
    return await this.adminPanelService.getAdminPanelInfo(userId);
  }

  async createAdminPanelElement(
    userId: string,
    element: string,
    body: BaseAdminPanelElementDto,
  ) {
    return await this.adminPanelService.createElement(userId, element, body);
  }

  async updateAdminPanelElement(
    userId: string,
    element: string,
    body: UpdateAdminPanelElementDto,
  ) {
    return await this.adminPanelService.updateElement(userId, element, body);
  }

  async getElementById(userId: string, element: string, id: number) {
    return await this.adminPanelService.getElementById(userId, element, id);
  }

  async deleteElement(userId: string, element: string, id: number) {
    return await this.adminPanelService.deleteElement(userId, element, id);
  }
}
