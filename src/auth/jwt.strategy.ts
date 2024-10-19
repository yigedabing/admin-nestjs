import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constant';
import type { User } from 'src/user/entities/user.entity';

/**
 * JWT验证策略
 * 前端请求头Authorization校验
 * 服务端校验通过后（validate），在请求头Request上添加user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(user: User) {
    Logger.log({ des: 'JwtStrategy.validate()', user });
    return {
      username: user.username,
      id: user.id,
      roles: user.roles,
      create: user.createdAt,
      upd: user.updatedAt,
    };
  }
}
