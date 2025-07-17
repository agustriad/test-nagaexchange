// transactions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './transactions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionsEntity])],
    // providers: [UsersService],
    // controllers: [UsersController],
    // exports: [UsersService],
})
export class TransactionsModule {}
