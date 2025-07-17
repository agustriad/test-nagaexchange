/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        /**
         * 
            const req = ctx.getRequest<Request>();
         */

        let status = HttpStatus.BAD_REQUEST;
        let message = 'Request not proccess';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const resBody = exception.getResponse();

            message =
                typeof resBody === 'string'
                    ? resBody
                    : (resBody as any).message || message;
        }

        res.status(status).json({
            success: false,
            message,
            data: null,
        });
    }
}
