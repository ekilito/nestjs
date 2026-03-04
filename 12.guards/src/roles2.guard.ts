import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles2 } from './roles2.decorator';
import { Request } from 'express';

@Injectable()

export class RolesGuard2 implements CanActivate {
  constructor(private reflector: Reflector) { }
  // 实现canActivate方法，用于路由守卫
  canActivate(context: ExecutionContext): boolean {
    // 获取处理程序上的Roles2元数据
    const roles: string[] = this.reflector.get(Roles2, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = { roles: [request.query.role] };
    return matchRoles(roles, user.roles);
  }
}

function matchRoles(roles: string[], userRoles: string[]): boolean {
  return userRoles.some(userRole => roles.includes(userRole));
}