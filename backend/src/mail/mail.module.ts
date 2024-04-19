import { ConfigModule, ConfigService } from '@nestjs/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailController } from './mail.controller'
import { MailService } from './mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { join } from 'path'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
        },
        defaults: {
          from: '"Exploro" <noreply@exploro.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
