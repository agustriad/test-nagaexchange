import { Injectable } from '@nestjs/common';
import IORedis from "ioredis";

@Injectable()
export class Redis extends IORedis {
    constructor() {
        super({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        });
    }
}
