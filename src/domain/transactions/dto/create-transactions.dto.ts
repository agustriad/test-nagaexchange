import { IsString, IsNumberString, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionsDto {
    @ApiProperty({
        example: '354.50',
        description: 'Amount',
        required: true,
    })
    @IsString()
    @IsNumberString()
    @IsDefined()
    amount: string;
}
