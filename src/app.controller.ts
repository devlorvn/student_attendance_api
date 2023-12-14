import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { BasResponseEntity } from "./common/entities/BaseResponse.entity";

export class HealthCheck extends BasResponseEntity {
  @ApiProperty({
    type: String,
    example: "Success",
  })
  data: "App is running!!!!";
}

@Controller()
@ApiTags("App")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    description: `Check app`,
    type: HealthCheck,
  })
  @ApiInternalServerErrorResponse({
    description: "Lỗi máy chủ server",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "error" },
        message: { type: "string", example: "Lỗi máy chủ server" },
      },
    },
  })
  @Get("health-check")
  getHello(): string {
    return this.appService.healthCheck();
  }
}
