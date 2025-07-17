import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        example: 'Your name',
        description: 'Full name of the employee',
    })
    name: string;

    @IsEmail()
    @ApiProperty({
        example: 'email@example.com',
        description: 'Valid email address of the employee',
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: 'yourpassword',
        description: 'Password used for login.',
    })
    password: string;
}
