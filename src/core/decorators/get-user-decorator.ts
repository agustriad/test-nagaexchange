/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../domain/authentication/interfaces/jwt-payload.interfaces';

export const GetUser = createParamDecorator(
    (data: keyof JwtPayload, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user as JwtPayload;

        return data ? user?.[data] : user;
    },
);
