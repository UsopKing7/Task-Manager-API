import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
@Injectable()
export class GlobalExceptionFilterMiddleware implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()

    const statusCode = error instanceof HttpException ? error.getStatus() : 400

    res.status(statusCode).json({
      success: false,
      statusCode,
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.url
    })
  }
}
