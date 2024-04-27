import { ConfigService } from '@nestjs/config'
import { MinioClientService } from './minio-client.service'
import { MinioModule } from 'nestjs-minio-client'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    MinioModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        endPoint: configService.get('STACKHERO_MINIO_HOST'),
        port: configService.get('MINIO_API_PORT'),
        useSSL: false,
        accessKey: configService.get('STACKHERO_MINIO_ACCESS_KEY'),
        secretKey: configService.get('STACKHERO_MINIO_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
