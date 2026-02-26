import { createParamDecorator } from './@nestjs/common';
export const UserDecorator = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user?.[data] : user;
},
);