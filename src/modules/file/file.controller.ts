import { Controller, Get, Post, Body, Delete, Query, Res, UploadedFile, UploadedFiles, UseInterceptors, ParseBoolPipe } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiBody, ApiTags } from "@nestjs/swagger";
import { DeleteFileDto } from "./dto/delete-file.dto";

@Controller("file")
@ApiTags("File")
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
        isPrivate: {
          type: "boolean",
          default: false,
        },
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body("folder") folder: string, @Body("isPrivate", ParseBoolPipe) isPrivate: boolean) {
    folder = folder ? folder + "/" : "";

    return this.fileService.uploadFile(file.buffer, folder + file.originalname, isPrivate);
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
        isPrivate: {
          type: "boolean",
          default: false,
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
    @Body("folder") folder: string,
    @Body("isPrivate", ParseBoolPipe) isPrivate: boolean
  ) {
    folder = folder ? folder + "/" : "";
    const prom = files.map((file) => this.fileService.uploadFile(file.buffer, folder + file.originalname, Boolean(isPrivate)));
    return Promise.all(prom);
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
