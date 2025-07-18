import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/response.dto';

export class AuthResponseDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT token for authentication',
    })
    token: string;

    @ApiProperty({ type: () => UserResponseDto })
    user: UserResponseDto;
}
