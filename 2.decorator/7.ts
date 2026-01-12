// 权限检查

function authorize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // 保存原始方法
  const originalMethod = descriptor.value; // [Function: deleteUser]

  descriptor.value = function (...args: any[]) {
    const user = { roles: ['admin'] };
    if (!user.roles.includes('admin')) {
      throw new Error("User is not authorized to call this method");
    }
    return originalMethod.apply(this, args);
  }
  return descriptor;
}

class AdminPanel {
  @authorize
  deleteUser(userId: string) {
    console.log(`User ${userId} deleted`);
  }
}
const adminPanel = new AdminPanel();
adminPanel.deleteUser('123'); // User 123 deleted