import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username)
    Logger.log(user)
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user

      return result
    }
    return null
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.userId,
    }

    return {
      username: user.username,
      userId: user.userId,
      access_token: this.jwtService.sign(payload),
    }
  }
}
