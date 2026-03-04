import { z } from 'zod';

// 定义一个名为 createCatSchema 的模式，用于验证猫对象的结构
export const createCatSchema = z.object({
  name: z.string(), // 定义对象的 name 属性，类型为字符串
  age: z.string()
}).required(); // 指定对象中的所有字段都是必填的

// 使用 zod 的 infer 方法推导 createCatSchema 的类型，定义一个名为 CreateCatDto 的类型
export type CreateCatDto = z.infer<typeof createCatSchema>;

