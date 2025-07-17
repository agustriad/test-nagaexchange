/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterAuthenticationDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginAuthenticationDto) {
        return this.authService.login(dto);
    }

    @Post('logout')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    logout(@Req() req) {
        return this.authService.logout(req?.user?.id);
    }
}
