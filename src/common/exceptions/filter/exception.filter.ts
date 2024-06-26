import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

interface IError {
  message: string;
  errorCode: string;
}
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? 200 : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? (exception.getResponse() as IError) : { message: "Lỗi hệ thống." };

    const responseData = {
      status: "error",
      ...message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(responseData);
  }
}
