import { Controller, Get, UseGuards } from "@nestjs/common";
import { RolesGuard2 } from "./roles2.guard";
import { Roles2 } from "./roles2.decorator";

@Controller('accounts')
export class AccountController {
  @Get()
  @UseGuards(RolesGuard2)
  @Roles2(['admin'])
  async index() {
    return 'This action returns all accounts';
  }
}