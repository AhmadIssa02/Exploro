import {  Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { MailService } from './mail.service'

@Controller('send-email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendEmail() {
    return await this.mailService.sendEmail()
  }
}
