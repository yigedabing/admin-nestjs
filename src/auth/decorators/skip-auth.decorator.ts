import { SetMetadata } from '@nestjs/common';

export const IS_SKIPAUTH_KEY = 'isSkipAuth';
/** 公共API */
export const SkipAuth = () => SetMetadata(IS_SKIPAUTH_KEY, true);
