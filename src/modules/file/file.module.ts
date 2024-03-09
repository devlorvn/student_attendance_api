import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ConfigService } from '@nestjs/config';
import { StorageService } from 'src/common/providers/storage.service';

@Module({
  controllers: [FileController],
  providers: [FileService, ConfigService, {
    provide: StorageService,
    useFactory: () => {
      return new StorageService(process.env.S3_PRIVATE_BUCKET);
    },
  },],
})
export class FileModule {}
