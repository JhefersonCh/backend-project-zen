import { Injectable } from '@nestjs/common';
import { MailerGeneratorService } from './mailerGenerator.service';

@Injectable()
export class PqrsService {
  constructor(private readonly mailGeneratorService: MailerGeneratorService) {}
  async sendPqrs(
    email: string,
    description: string,
    name: string,
  ): Promise<void> {
    await this.mailGeneratorService.sendPqrEmail(email, name, description);
  }
}
