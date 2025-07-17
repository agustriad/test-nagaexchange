import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../core/entities/common.entity';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'transactions' })
export class TransactionsEntity extends CommonEntity {
    @Column({ name: 'amount', type: 'varchar', length: 100, default: '0' })
    amount: string;

    @ManyToOne(() => UsersEntity, (user) => user.transactions, { eager: false })
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;
}
