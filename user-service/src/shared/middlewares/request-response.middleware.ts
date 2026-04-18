import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
@Injectable()
export class GlobalExceptionFilterMiddleware implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()
    const isHttp = error instanceof HttpException
    const statusCode = isHttp ? error.getStatus() : 500
    const message = isHttp
      ? error.getResponse()
      : error instanceof Error
        ? error.message
        : 'Internal server error'

    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: req.url
    })
  }
}
