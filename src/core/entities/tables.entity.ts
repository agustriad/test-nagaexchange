/**
 * Only Example
 */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';

import { SubTableEntity } from './subTables.entity';

const curdate = new Date();

@Entity({ name: 'tables' })
export class TableEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean' })
  is_active: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column({ type: 'integer', nullable: true })
  created_by: number;

  @Column({ type: 'integer', default: null })
  updated_by: number;

  @ManyToMany(() => SubTableEntity, (tbl) => tbl.category_id)
  @JoinTable()
  tbl: SubTableEntity[];

  $beforeInsert(): void {
    this.created_at = curdate;
    this.is_active = true;
  }

  $beforeUpdate(): void {
    this.updated_at = curdate;
  }
}
