  import * as crypto from 'crypto'
  import { BufferedFile } from './file.model'
  import { ConfigService } from '@nestjs/config'
  import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
  import { MinioClient, MinioService } from 'nestjs-minio-client'

  @Injectable()
  export class MinioClientService {
    private readonly logger = new Logger(MinioClientService.name)
    private readonly baseBucket: string
    private readonly client: MinioClient
    private readonly minioEndpoint: string
    private readonly minioPort: number

    /**
     * Creates a new MinioClientService instance and sets the bucket policy
     * @param minioService
     * @param configService
     * @constructor
     * @todo: Create a bucket first if it doesn't exist
     * @throws {HttpException}
     */
    constructor(private readonly minio: MinioService, private readonly config: ConfigService) {
      this.baseBucket = this.config.get('BUCKET_NAME')
      this.client = this.minio.client
      this.minioEndpoint = 'http://localhost'
      this.minioPort = this.config.get('MINIO_API_PORT')

      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              AWS: ['*'],
            },
            Action: ['s3:ListBucketMultipartUploads', 's3:GetBucketLocation', 's3:ListBucket'],
            Resource: [`arn:aws:s3:::${this.baseBucket}`],
          },
          {
            Effect: 'Allow',
            Principal: {
              AWS: ['*'],
            },
            Action: [
              's3:PutObject',
              's3:AbortMultipartUpload',
              's3:DeleteObject',
              's3:GetObject',
              's3:ListMultipartUploadParts',
            ],
            Resource: [`arn:aws:s3:::${this.baseBucket}/*`],
          },
        ],
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.client.setBucketPolicy(this.baseBucket, JSON.stringify(policy), function (err) {
        if (err) {
          console.log(err);
          throw new HttpException('Error setting bucket policy', HttpStatus.BAD_REQUEST)
      }
      })
    }

    /**
     * Uploads a file to MinIO S3 and returns the URL
     * @param file
     * @param baseBucket
     * @returns {Promise<{url: string}>}
     * @description hash the filename to avoid duplicate filenames and to make it harder to guess the filename
     * @description used in the file-upload.service.ts
     * @throws {HttpException}
     */
    public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
      this.logger.log('Uploading file to minio')

      if (
        !(
          file.mimetype.includes('jpeg') ||
          file.mimetype.includes('png') ||
          file.mimetype.includes('jpg') ||
          file.mimetype.includes('webp') ||
          file.mimetype.includes('avif') ||
          file.mimetype.includes('jfif') ||
          file.mimetype.includes('pjpeg') ||
          file.mimetype.includes('pjp')
        )
      ) {
        throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
      }
      const temp_filename = Date.now().toString()
      const hashedFileName = crypto.createHash('md5').update(temp_filename).digest('hex')
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length
      )
      const metaData = {
        'Content-Type': file.mimetype,
        'X-Amz-Meta-Testing': 1234,
      }
      const filename = hashedFileName + ext
      const fileName = `${filename}`
      const fileBuffer = file.buffer

      const size = file.size
      

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.client.putObject(baseBucket, fileName, fileBuffer, size, metaData, function (err, res) {
        if (err) throw new HttpException('Error uploading file' + err, HttpStatus.BAD_REQUEST)
      })

      return {
        url: `${this.minioEndpoint}:${this.minioPort}/${baseBucket}/${filename}`,
      }
    }

    /**
     * Deletes a file from MinIO S3
     * @param objetName
     * @param baseBucket
     * @description used in the file-upload.service.ts
     * @throws {HttpException}
     */
    async delete(objetName: string, baseBucket: string = this.baseBucket) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.client.removeObject(baseBucket, objetName, function (err) {
        if (err) throw new HttpException('Oops Something wrong happend', HttpStatus.BAD_REQUEST)
      })
    }
  }
