import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {
  }

  async sendEmail() {
    try {
        await this.mailerService.sendMail({
          to: 'charbelfayad@gmail.com',
          subject: 'Testing please work',
          template: './helloworld',
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
  }
}