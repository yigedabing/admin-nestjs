import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '开放权限API接口，无需授权token访问';
  }
}
