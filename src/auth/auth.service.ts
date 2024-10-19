import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { IRegister } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username, password);
    if (user && user.password === password) {
      return {
        ...user,
        access_token: this.jwtService.sign({
          ...user,
        }),
      };
    }
    return null;
  }

  async register(params: IRegister) {
    return this.userService.register(params);
  }
}
