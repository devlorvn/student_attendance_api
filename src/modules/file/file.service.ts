import { Injectable } from '@nestjs/common';
import { DeleteFileDto } from './dto/delete-file.dto';
import { StorageService } from 'src/common/providers/storage.service';

@Injectable()
export class FileService {
  constructor(private vStorageService: StorageService) {}

  async uploadFile(imageBuffer: Buffer, filename: string) {
    const avatar = await this.vStorageService.uploadPublicFile(
      imageBuffer,
      filename,
    );

    return avatar;
  }

  async getFiles(folderName: string) {
    const files = await this.vStorageService.getFiles(folderName);

    return files;
  }

  async downloadFile(key: string) {
    const file = await this.vStorageService.downloadFile(key);

    return file;
  }

  async deleteFile({ key }: DeleteFileDto) {
    const file = await this.vStorageService.deleteFile(key);

    return file;
  }
}
