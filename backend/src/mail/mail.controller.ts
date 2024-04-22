import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { User } from 'src/users/schemas/user.schema';

@Controller('send-email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendEmail(@Body('user') user: User, @Body('content') content: string) {
    return await this.mailService.sendEmail(user, content);
  }
}
