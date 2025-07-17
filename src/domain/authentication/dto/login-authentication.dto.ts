import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthenticationDto {
    @ApiProperty({
        example: 'agustriadji@email.com',
        description: 'Email registered',
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'asdf1234*',
        description: 'Password user',
        required: true,
    })
    @IsString()
    password: string;
}
