import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

import { DataSource } from '../database/dataSource.database';

import { PingModule } from './domain/ping/ping.module';
import { HealthModule } from './domain/health/health.module';

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
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply().forRoutes('*');
    }
}
