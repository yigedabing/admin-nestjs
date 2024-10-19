import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { IRegister } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request) {
    return req.user;
  }

  @SkipAuth()
  @Post('register')
  @HttpCode(200)
  async register(@Body() body: IRegister) {
    return this.authService.register(body);
  }
}
