import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    // console.log(
    //   '🚀 ~ file: bad-request.exception.ts:12 ~ BadRequestExceptionFilter ~ exception:',
    //   exception,
    // );
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as any;
    const messageError = exceptionResponse?.message;
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      // you can manipulate the response here
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: Array.isArray(messageError) ? messageError?.[0] : messageError,
      });
  }
}
