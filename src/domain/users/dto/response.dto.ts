import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: '7e7eecb6-67ff-4b6e-a93c-bd8c81a42023' })
    id: string;

    @ApiProperty({ example: 'Agustriadji' })
    name: string;

    @ApiProperty({ example: 'Agustriadji@example.com' })
    email: string;

    @ApiProperty({ example: 'generated-auth-token' })
    token: string;

    @ApiProperty({ example: '2025-07-16T14:10:20.000Z' })
    created_at: string;

    @ApiProperty({ example: '2025-07-16T14:10:20.000Z' })
    updated_at: string;
}
