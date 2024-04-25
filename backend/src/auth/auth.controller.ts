import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';
import { verifyEmailDto } from './dto/verify.dto';
import { ResendCodeDto } from './dto/resend-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('verify-email')
  async verifyEmail(@Body() body: verifyEmailDto): Promise<boolean> {
    return this.authService.verifyEmail(body);
  }

  @Post('resend-verification-code')
  async resendVerificationCode(
    @Body() resendCodeDto: ResendCodeDto,
  ): Promise<boolean> {
    return this.authService.resendVerificationCode(resendCodeDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string): Promise<boolean> {
    return this.authService.forgotPassword(email);
  }

  @Post('verify-password-token')
  async verifyPasswordToken(
    @Body('email') email: string,
    @Body('passwordToken') passwordToken: string,
  ): Promise<boolean> {
    return this.authService.verifyPasswordToken(email, passwordToken);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<boolean> {
    return this.authService.resetPassword(email, password);
  }
}
