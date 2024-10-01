import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_SKIPAUTH_KEY } from './skip-auth'

/**
 * 请求头Authorization校验
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    // 公共API
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(IS_SKIPAUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    console.log('isSkipAuth', isSkipAuth)
    if (isSkipAuth) {
      return true
    }

    return super.canActivate(context)
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('暂无访问权限')
    }
    return user
  }
}
