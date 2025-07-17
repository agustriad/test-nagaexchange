import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../core/entities/common.entity';
import { TransactionsEntity } from '../transactions/transactions.entity';

@Entity({ name: 'users' })
export class UsersEntity extends CommonEntity {
    @Column({ name: 'name', type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 50 }) email: string;

    @Column({ name: 'token', type: 'text', nullable: true })
    token?: string;

    @Column({ type: 'text', select: false }) password: string;

    @OneToMany(() => TransactionsEntity, (transaction) => transaction.user)
    transactions: TransactionsEntity[];
}
