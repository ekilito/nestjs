import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';

// 描述 UploadController 的测试套件
describe('UploadController', () => {

  let uploadController: UploadController;
  // 在每个测试用例之前运行的异步函数
  beforeEach(async () => {
    // 创建一个测试模块实例，并传入 UploadController 控制器
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UploadController]
    }).compile();
    // 获取测试模块中的 UploadController 实例
    uploadController = app.get<UploadController>(UploadController);
  });

  // 描述 index 方法的测试用例
  describe('index', () => {
    // 定义一个测试用例，期望返回 "hello"
    it('should return "hello"', () => {
      // 断言 uploadController.index() 方法的返回值的 message 属性为 'hello'
      expect(uploadController.index().message).toBe('hello');
    });
  });
});
