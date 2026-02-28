import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // 如果此响应已经发送，则返回
    if (response.headersSent) {
      return
    }
    if (exception instanceof HttpException) {
      if (typeof exception.getResponse() === 'string') {
        const status: any = exception.getStatus();
        response.status(status).json({
          statusCode: status,
          message: exception.getResponse()
        })
      } else {
        response.status(exception.getStatus()).json(exception.getResponse())
      }
    } else {
      return response.status(500).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: exception.message,
        message: "Internal server error"
      });
    }
  }
}