import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(user: User, content: string, type: string): Promise<boolean> {
    if (type === 'verify') {
      try {
        await this.mailerService.sendMail({
          to: user.email,
          subject: 'Hello ✔',
          template: './verification_code',

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
    } else if (type === 'reset') {
      try {
        await this.mailerService.sendMail({
          to: user.email,
          subject: 'Hello ✔',
          template: './reset_password',
          context: {
            userName: user.name,
            resetCode: content,
          },
        });
        return true;
      } catch (error) {
        console.error('Error sending email:', error);
        return false;
      }
    }
  }
}
