* 安装 （使用脚手架 express-generator）

## 登录
* 使用 express-session 和 connect-redis 
* req.session保存登录信息,登录校验做成express中间件

* express中间件
    - app.use用来注册中间件,首先收集起来
    - 遇到http请求,根据path method来判断触发哪些
    - 实现next 机制 即上一个通过 next触发下一个