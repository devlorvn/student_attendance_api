import { Controller, Get, Post, Body, Delete, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiBody } from "@nestjs/swagger";
import { DeleteFileDto } from "./dto/delete-file.dto";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get("download")
  async downloadFile(@Res() res, @Query("key") key: string) {
    const file = await this.fileService.downloadFile(key);
    return res.redirect(file);
  }

  @Post("upload-single")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      required: ["folder", "file"],
      type: "object",
      properties: {
        folder: {
          type: "string",
        },
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      folder: string;
    }
  ) {
    const folder = body.folder ? body.folder + "/" : "";

    return this.fileService.uploadFile(file.buffer, folder + file.originalname);
  }

  @Post("upload-multiple")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      required: ["folder", "files"],
      type: "object",
      properties: {
        folder: {
          type: "string",
        },
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor("files"))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body()
    body: {
      folder: string;
    }
  ) {
    const folder = body.folder ? body.folder + "/" : "";
    const prom = files.map((file) => this.fileService.uploadFile(file.buffer, folder + file.originalname));
    return Promise.allSettled(prom);
  }

  @Delete("delete")
  @ApiBody({
    schema: {
      required: ["key"],
      type: "object",
      properties: {
        key: {
          type: "string",
        },
      },
    },
  })
  deleteFile(@Body() deleteFileDto: DeleteFileDto) {
    return this.fileService.deleteFile(deleteFileDto);
  }
}
