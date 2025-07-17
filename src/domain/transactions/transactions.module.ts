// transactions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './transactions.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionsEntity]), UsersModule],
    providers: [TransactionsService],
    controllers: [TransactionsController],
})
export class TransactionsModule {}
