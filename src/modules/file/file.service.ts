import { Injectable } from "@nestjs/common";
import { DeleteFileDto } from "./dto/delete-file.dto";
import { StorageService } from "src/common/providers/storage.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FileService {
  constructor(
    private storageService: StorageService,
    private readonly configService: ConfigService
  ) {}

  async uploadFile(imageBuffer: Buffer, filename: string, _private: boolean) {
    console.log(_private)
    filename = _private ? `private/${filename}` : `public/${filename}`;
    console.log(filename)
    // await this.storageService.uploadPublicFile(imageBuffer, filename);
    return {
      url: !_private ? `${this.configService.get("S3_HOST_URL")}/${filename}` : await this.downloadFile(filename),
    };
  }

  async getFiles(folderName: string) {
    const files = await this.storageService.getFiles(folderName);

    return files;
  }

  async downloadFile(key: string) {
    const file = await this.storageService.downloadFile(key);

    return file;
  }

  async deleteFile({ key }: DeleteFileDto) {
    const file = await this.storageService.deleteFile(key);

    return file;
  }
}
