import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt';
import { Redis } from './redis';

@Module({
    providers: [Bcrypt, Redis],
    exports: [Bcrypt, Redis],
})
export class UtilsModule {}
