import { ApiProperty } from '@nestjs/swagger';
import { AuthResponseDto } from './response-authentication';

export class AuthResponseWrapperDto {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'Login Success' })
    message: string;

    @ApiProperty({ type: () => AuthResponseDto })
    data: AuthResponseDto;
}
