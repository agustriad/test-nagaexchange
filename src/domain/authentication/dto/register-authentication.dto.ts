import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthenticationDto {
    @ApiProperty({
        example: 'Agus Triadji',
        description: 'Fulname',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'agustriadji@email.com',
        description: 'Email user, must be unique',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'asdf1234*',
        description: 'Password min 5 char',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;
}
