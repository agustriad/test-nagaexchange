import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DataSource } from '../../../database/dataSource.database';

import 'dotenv/config';
@Module({
    imports: [TerminusModule, HttpModule, DataSource()],
    controllers: [HealthController],
})
export class HealthModule {}
