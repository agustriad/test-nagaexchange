import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Put,
    Param,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { GetUser } from '../../core/decorators/get-user-decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateTransactionsDto } from './dto/update-transactions.dto';

@Controller('transaction')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    async list(@GetUser('sub') userId: string) {
        return this.transactionsService.list(userId);
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID Transaction',
    })
    async findById(@GetUser('sub') userId: string, @Param('id') id: string) {
        return this.transactionsService.findById(id, userId);
    }

    @Post('process')
    async create(
        @Body() dto: CreateTransactionsDto,
        @GetUser('sub') userId: string,
    ) {
        console.log(dto, 88);
        return this.transactionsService.create(dto, userId);
    }

    @Put('/process/:id')
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID Transaction',
    })
    async update(
        @Body() dto: UpdateTransactionsDto,
        @GetUser('sub') userId: string,
        @Param('id') id: string,
    ) {
        return this.transactionsService.update(dto, userId, id);
    }
}
