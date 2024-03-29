import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { JwtAuthGuard } from "src/common/guards";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { RequestWithUser } from "../auth/auth.interface";
import { FileInterceptor } from "@nestjs/platform-express";

@UseGuards(JwtAuthGuard)
@Controller("app/account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get("")
  profile(@Req() req: RequestWithUser) {
    return req.user
  }

  @Patch("/avatar")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      required: ["file"],
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  async updateAvatar(@UploadedFile() file: Express.Multer.File, @Req() { user }: RequestWithUser) {
    const newFileName = `${user.mssv}_avatar`;
    const res = await this.accountService.uploadAvatarFile(file.buffer, newFileName);
    return this.accountService.updateStudentAvatar(res.url.split("avatar/")[1], user.mssv);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.accountService.remove(+id);
  }
}
