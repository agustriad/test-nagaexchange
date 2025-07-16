import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from '../../core/entities/tables.entity';
import { SubTableEntity } from '../../core/entities/subTables.entity';

@Injectable()
export class ExampleService {
    constructor(
        @InjectRepository(TableEntity)
        private readonly tableRepository: Repository<TableEntity>,
        @InjectRepository(SubTableEntity)
        private readonly subTableRepository: Repository<SubTableEntity>,
    ) {}
    /**
     * service
     */
}
