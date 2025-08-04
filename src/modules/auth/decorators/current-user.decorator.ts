import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

interface CurrentUserPayload {
  userId: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CurrentUserPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
