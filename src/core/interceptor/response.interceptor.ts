import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    StreamableFile,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface TypeResponse {
    status: string;
    statusCode: number;
    data: any[] | [];
}
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                if (data?.statusCode) {
                    context
                        .switchToHttp()
                        .getResponse()
                        .status(data.statusCode);
                    delete data.statusCode;
                    return {
                        ...data,
                    };
                } else {
                    const checkBuffer = Buffer.isBuffer(data);
                    if (checkBuffer) {
                        return new StreamableFile(data);
                    } else {
                        return {
                            ...data,
                        };
                    }
                }
            }),
        );
    }
}
