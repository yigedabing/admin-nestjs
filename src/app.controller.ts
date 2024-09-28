import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { Request } from 'express'
// import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    // return req.user
    return this.authService.login(req.user as any)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user
  }
}
