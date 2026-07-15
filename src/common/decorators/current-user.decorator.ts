import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../generated/prisma/client.js';

type RequestWithUser = Request & { user: User };

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    // 3. Switch the context to HTTP and get the Request object
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
