import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';

@Global() // 标记为全局模块 CommonService 可以在任何模块中使用，无需导入
@Module({
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule { }