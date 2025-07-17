import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        example: 'Agus Triadji',
        description: 'Full name of the user',
    })
    name: string;

    @IsEmail()
    @ApiProperty({
        example: 'agustriadji@email.com',
        description: 'Valid email address of the user',
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: 'asdf1234*',
        description: 'Password used for login.',
    })
    password: string;
}
