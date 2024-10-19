import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * 登陆验证
   * @param username `用户名`
   * @param password `密码`
   * @returns
   */
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    Logger.log({ des: 'LocalStrategy.validate()', ...user });
    if (!user) {
      throw new HttpException('用户名或者密码不正确', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
