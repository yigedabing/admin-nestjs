import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_SKIPAUTH_KEY } from './decorators/skip-auth.decorator';

/**
 * 请求头Authorization校验
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 公共API
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      IS_SKIPAUTH_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isSkipAuth) {
      return true;
    }
    const { url, body, params, query, method } = context
      .switchToHttp()
      .getRequest<Request>();

    Logger.log({
      isSkipAuth: isSkipAuth ? '开放性API' : '身份认证API',
      method,
      url,
      body,
      params,
      query,
    });

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      Logger.error('token验证没有通过，token已过期');
      throw err || new UnauthorizedException('暂无访问权限');
    }
    return user;
  }
}
