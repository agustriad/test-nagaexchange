import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { TransactionsEntity } from './transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTransactionsDto } from './dto/update-transactions.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionsEntity)
        private readonly transactionsRepo: Repository<TransactionsEntity>,
        private readonly usersService: UsersService,
    ) {}

    async create(dto: CreateTransactionsDto, userId: string) {
        // find user

        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new UnauthorizedException();
        }

        const trx = this.transactionsRepo.create(dto);
        trx.user = user;
        const res = await this.transactionsRepo.save(trx);
        return {
            amount: res.amount,
            id: res.id,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            createdAt: res.createdAt,
            updatedAt: res.updatedAt,
        };
    }

    async update(dto: UpdateTransactionsDto, userId: string, id: string) {
        const trxRecord = await this.transactionsRepo.findOneBy({
            id,
            user: { id: userId },
        });
        if (!trxRecord) {
            throw new NotFoundException();
        }

        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new UnauthorizedException();
        }

        trxRecord.amount = dto.amount;
        const transaction = await this.transactionsRepo.save(trxRecord);
        return transaction;
    }

    // list
    async list(userId: string) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new UnauthorizedException();
        }

        const transactions = await this.transactionsRepo.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });

        return transactions.map((trx) => ({
            amount: trx.amount,
            id: trx.id,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            createdAt: trx.createdAt,
            updatedAt: trx.updatedAt,
        }));
    }

    // findByid
    async findById(id: string, userId: string) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new UnauthorizedException();
        }

        const trx = await this.transactionsRepo.findOne({
            where: { id, user: { id: userId } },
            relations: ['user'],
        });

        if (!trx) {
            throw new NotFoundException();
        }

        return {
            amount: trx.amount,
            id: trx.id,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            createdAt: trx.createdAt,
            updatedAt: trx.updatedAt,
        };
    }
}
