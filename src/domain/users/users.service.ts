import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/domain/users/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepo: Repository<UsersEntity>,
    ) {}

    async create(dto: CreateUserDto): Promise<UsersEntity> {
        const employee = this.userRepo.create({
            name: dto.name,
            email: dto.email,
            password: dto.password,
        });

        const already = await this.checkEmail(employee.email);
        if (already) {
            throw new BadRequestException('Email already registered');
        } else {
            return await this.userRepo.save(employee);
        }
    }

    async findById(id: string): Promise<UsersEntity> {
        return await this.userRepo.findOne({
            where: { id },
        });
    }

    async checkEmail(email: string): Promise<UsersEntity> {
        return await this.userRepo.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password'],
        });
    }

    async updateToken(id: string, token: string): Promise<void> {
        await this.userRepo.update(id, { token });
    }
}
