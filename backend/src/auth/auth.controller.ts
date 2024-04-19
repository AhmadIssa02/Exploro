import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<{token: string}> {
        return this.authService.signUp(signUpDto);
    }

    @Post('login')
    @Throttle({ default: { limit: 10, ttl: 60000 } })
    async login(@Body() loginDto: LoginDto): Promise<{token: string}>{
        return this.authService.login(loginDto);
    }
}
