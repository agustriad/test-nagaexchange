/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

import { DataSource } from '../database/dataSource.database';

import { PingModule } from './domain/ping/ping.module';
import { HealthModule } from './domain/health/health.module';
import { UsersModule } from './domain/users/users.module';
import { AuthenticationModule } from './domain/authentication/authentication.module';

@Module({
    imports: [
        DataSource(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '1d',
            },
        }),
        //Module
        PingModule,
        HealthModule,
        UsersModule,
        AuthenticationModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes('*');
    }
}
