import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { UsersService } from '../users/users.service';
import { Bcrypt } from 'src/core/utils/bcrypt';
import { GlobalErrorMessage } from '../../core/constants/error-code';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly bcrypt: Bcrypt,
    ) {}

    async register(dto: RegisterAuthenticationDto) {
        const existing = await this.usersService.checkEmail(dto.email);
        if (existing) {
            throw new ConflictException(
                GlobalErrorMessage.FAILED_LOGIN_REGISTERED,
            );
        }

        const hashedPassword = await this.bcrypt.hashPassword(dto.password);
        const user = await this.usersService.create({
            ...dto,
            password: hashedPassword,
        });

        return {
            message: 'User registered successfully',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }

    async login(dto: LoginAuthenticationDto) {
        const user = await this.usersService.checkEmail(dto.email);
        if (!user)
            throw new UnauthorizedException(
                GlobalErrorMessage.FAILED_LOGIN_DATA_INCORRECT,
            );

        const isMatch = await this.bcrypt.comparePassword(
            dto.password,
            user.password,
        );

        if (!isMatch)
            throw new UnauthorizedException(
                GlobalErrorMessage.FAILED_LOGIN_DATA_INCORRECT,
            );

        // update token
        const token = this.jwtService.sign({ sub: user.id, email: user.email });
        await this.usersService.updateToken(user.id, token);

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }

    async logout(userId: string) {
        await this.usersService.updateToken(userId, null);
        return { message: 'Logout successful' };
    }
}
