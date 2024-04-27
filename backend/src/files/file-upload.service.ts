import { BufferedFile } from '../minio/file.model'
import { Injectable } from '@nestjs/common'
import { MinioClientService } from '../minio/minio-client.service'

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  /**
   * Uploads a single file to MinIO S3
   * @param image
   * @returns {Promise<{image_url: string, message: string}>}
   */
  async uploadSingle(image: BufferedFile) {
    const uploaded_image = await this.minioClientService.upload(image)

    return {
      image_url: uploaded_image.url,
    }
  }
}
