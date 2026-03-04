import { Controller, Get, UseGuards } from "@nestjs/common"
import { AuthGuard } from "./auth.guard"; // 导入 AuthGuard 守卫
import { Roles } from "./roles.decorator";

@Controller('accounts')
export class AccountController {
  @Get()
  // 使用 @UseGuards 装饰器来应用 AuthGuard守卫
  @UseGuards(AuthGuard)
  // 使用 @Roles 装饰器来限制只有具有 'admin' 角色的用户才能访问此方法
  @Roles('admin') // 此装饰器的作用是给当前的index函数添加了角色数组的元数据
  async index() {
    return `this action return all accounts`
  }
}