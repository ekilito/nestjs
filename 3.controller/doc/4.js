/**
 * express中的next是一个用于中间件链处理的函数
 * 每个中间件接收三个参数 req,res,next
 * 中间件函数通过调用next可以将控制权传递给下一个中间件函数，如果中间没有调用next，请求请会挂起
 * 
 */
 // 模拟请求对象，仅包含一个 url 属性
class Request {
    url
    constructor(url) {
        this.url = url;
    }
}
// 模拟响应对象，提供一个 send 方法
class Response {
    send(message) {
        console.log(message)
    }
}

// 模拟了 Express 的路由分发和中间件执行机制
class Express {
    middlewares = [] // 存储所有通过 app.use() 注册的中间件函数
    use(middleware) { //将中间件函数按顺序推入数组
        this.middlewares.push(middleware);
    }
    handleRequest(req,res){
        const {middlewares} = this;
        let index = 0; // 闭包变量，用于记录当前执行到第几个中间件
        function next(){
            if(index<middlewares.length){
                const middleware = middlewares[index++];
                middleware(req,res,next);
            }
        }
        next()
    }
}
const app = new Express();
app.use((req, res, next) => {
    console.log('middleware1');
    next(); // 调用此函数，驱动引擎去执行下一个中间件
});
app.use((req, res, next) => {
    console.log('middleware2');
    next();
});
// middleware1 和 middleware2 都调用了 next()，所以控制权会一直传递。
// middleware3 调用了 res.send('hello') 但没有调用 next()。在实际 Express 中，这通常意味着请求处理完成，不再往下传递
app.use((req, res, next) => {
    console.log('middleware3');
    res.send('hello');
});

const req = new Request('/users');
const res = new Response();
app.handleRequest(req,res);