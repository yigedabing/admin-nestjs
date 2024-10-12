import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { Request } from 'express'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { SkipAuth } from './auth/skip-auth'
import { UsersService } from './users/users.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get()
  @SkipAuth()
  getHello(): string {
    return this.appService.getHello()
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Req() req: Request) {
    return this.authService.login(req.user as any)
  }

  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user
  }

  @Get('userList')
  async getUserList() {
    return this.userService.findAllUser()
  }
}
