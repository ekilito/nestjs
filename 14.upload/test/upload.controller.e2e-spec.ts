
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as path from 'path';
const request = require('supertest');

// 描述 'UploadController' 测试套件
describe('UploadController', () => {
  // 声明一个 INestApplication 类型的变量 app
  let app: INestApplication;
  // 在所有测试之前运行的钩子
  beforeAll(async () => {
    // 创建一个 TestingModule 实例
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // 导入 AppModule
      imports: [AppModule],
    }).compile();
    // 创建一个 Nest 应用实例
    app = moduleFixture.createNestApplication();
    // 初始化应用
    await app.init();
  });
  // 定义一个测试用例，测试 /upload/files 路由
  it('/upload/files', async () => {
    // 发送一个 POST 请求到 /upload/files，包含多个文件
    const response = await request(app.getHttpServer())
      .post('/upload/files')
      // 设置请求头 Content-Type 为 multipart/form-data
      .set('Content-Type', 'multipart/form-data')
      // 附加第一个文件
      .attach('files', path.join(__dirname, 'test-files/file1.txt'))
      // 附加第二个文件
      .attach('files', path.join(__dirname, 'test-files/file2.txt'))
      // 附加第三个文件
      .attach('files', path.join(__dirname, 'test-files/file3.txt'));
    // 断言响应状态码为 201
    expect(response.status).toBe(201);
    // 断言响应体中的 message 为 'Files uploaded successfully'
    expect(response.body.message).toBe('Files uploaded successfully');
  });
  // 在所有测试之后运行的钩子
  afterAll(async () => {
    // 关闭应用
    await app.close();
  });
});