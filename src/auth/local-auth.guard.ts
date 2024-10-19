import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 校验登陆验证码是否正确
    // const isPass = await sleep();

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    Logger.log({
      des: 'local-auth.guard',
      url: request.url,
      body: request.body,
      params: request.params,
      query: request.query,
    });
    return request;
  }
}
