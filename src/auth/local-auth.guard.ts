import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()
    Logger.log({
      des: 'local-auth.guard',
      url: request.url,
      body: request.body,
      params: request.params,
      query: request.query,
    })
    return request
  }
}
