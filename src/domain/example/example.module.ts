import { Module } from '@nestjs/common';
import { ExampleServiceController } from './example.controller';
import { ExampleService } from './example.service';
import { TableEntity } from '../../core/entities/tables.entity';
import { SubTableEntity } from '../../core/entities/subTables.entity';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from '../../../database/dataSource.database';

import 'dotenv/config';

@Module({
    imports: [
        DataSource(),
        TypeOrmModule.forFeature([TableEntity, SubTableEntity]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '1d',
            },
        }),
    ],
    controllers: [ExampleServiceController],
    providers: [ExampleService],
})
export class exampleModule {}
