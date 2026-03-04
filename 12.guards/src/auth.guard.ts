import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  // canActivate 方法用于决定是否允许某个请求通过
  canActivate(context: ExecutionContext): boolean {

    // 从处理程序的元数据中获取角色信息
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log('roles:', roles) // roles: [ 'admin' ]

    if (!roles) {  // 如果没有角色信息，直接返回 true 允许通过
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();   // 获取当前请求对象
    const user = request.user; // 从请求查询参数中获取用户角色
    console.log('user:', user) // user: { id: 1, name: 'nick', roles: [ 'admin' ] }
    return matchRoles(roles, user.roles); // 检查用户角色是否匹配所需角色
  }
}

// 检查用户角色是否匹配所需角色
function matchRoles(roles: string[], userRoles: string[]): boolean {
  // 如果用户的任何角色包含在所需角色中，则返回 true
  return userRoles.some(userRole => roles.includes(userRole));
}

// CanActivate： 守卫接口，要求实现 canActivate() 方法，决定请求是否能够继续执行
// 返回 true：允许请求继续 返回 false：拒绝请求，返回 403 Forbidden
// ExecutionContext： 执行上下文对象，提供当前请求的详细信息
// Reflector： 反射器，用于获取自定义元数据 读取通过装饰器设置的元数据