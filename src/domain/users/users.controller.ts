import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const res = await this.usersService.findById(id);
        if (!res) {
            throw new NotFoundException();
        }
        return res;
    }
}
