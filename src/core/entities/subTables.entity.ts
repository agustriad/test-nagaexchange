/**
 * Only Example
 */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
  BaseEntity,
} from 'typeorm';

import { TableEntity } from './tables.entity';

const curdate = new Date();

@Entity({ name: 'sub_tables' })
export class SubTableEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar' })
  type: 'Cash In' | 'Cash Out';

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'timestamptz' })
  transaction_date: Date;

  @Column({ type: 'integer' })
  last_transaction_amount: number;

  @Column({ type: 'integer' })
  transaction_amount: number;

  @Column({ type: 'integer' })
  category_id?: number;

  @Column({ type: 'varchar' })
  made_by?: string;

  @Column({ type: 'text' })
  note?: string;

  @Column({ type: 'varchar' })
  from_account: string;

  @Column({ type: 'integer' })
  company_id: number;

  @Column({ type: 'integer' })
  is_employee: number;

  @Column({ type: 'json' })
  transaction_proof?: object;

  @Column({ type: 'integer', nullable: true })
  created_by?: number;

  @Column({ type: 'integer', nullable: true })
  updated_by?: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToMany(() => TableEntity, (category: TableEntity) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: TableEntity;

  $beforeInsert(): void {
    this.created_at = curdate;
  }

  $beforeUpdate(): void {
    this.updated_at = curdate;
  }
}
