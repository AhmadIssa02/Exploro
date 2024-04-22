import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(user: User, content: string): Promise<boolean> {
    console.log('Sending email to:', user.email);
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Hello ✔',
        template: './helloworld', // Make sure this path is correct
        context: {
          userName: user.name,
          verificationCode: content,
        },
      });
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
