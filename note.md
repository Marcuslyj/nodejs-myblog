
* 服务稳定性
    - PM2进程守候
* 考虑内存和CPU（优化扩展）
    - stream 写日志 使用redis 存session
* 日志记录
    - 记录日志 存储日志 分析日志 
* 安全
    - 越权操作 数据库攻击
    - 登陆验证  预防xss 攻击和sql注入
* 集群和服务拆分

* 首页 作者首页  博客详情页
* 登录页
* 管理中心 新建页 编辑页

* 数据如何存储
    - blog = { id,title,content,createtime,author}
    - user = { id, username <varchar(20)>,password<varchar(20)> realname<varchar(10)>}
* 如何与前端对接 即接口设计

* 获取博客列表       /api/blog/list          params author
* 获取一篇博客的内容  /api/blog/detail        params  id
* 新增一篇博客       /api/blog/new           
* 更新一篇博客       /api/blog/update        params   id
* 删除一篇博客      /api/blog/del            params    id
* 登录             /api/user/login         params     username  password

* http请求概述
    - DNS解析,建立TCP连接,发送http请求
    - server 接受到 http请求 处理并返回
    - 客户端接受到返回数据,处理数据。


 * node.js处理http请求
    - get 请求和querystring
    - post 请求和postdata
    - 路由   


  # 操作表
  * 增 删  改 查
  * 使用 sql语句 
  
```
use myblog;
 show tables;
 insert into users(username,`password`,realname) values('zhangsan','123','张三');
 insert into users(username,`password`,realname) values('lisi','123','李四');
 select * from users; 
select id,username from users;
select * from users where username='zhangsan'and `password`='123';
 select * from users where username = 'zhangsan' or `password` = '123';
 select * from users where password like '%1%';
select * from users where password like '%1%' order by id desc;

SET SQL_SAFE_UPDATES=0;
update users set realname='李四2' where username='lisi'
delete from users where username ='lisi';
update users set state ='0' where username = 'lisi';
select * from users where state = '1';

insert into blogs(title,content,createtime,author) values('标题A','内容A',2342343,'张三');
insert into blogs(title,content,createtime,author) values('标题B','内容B',2342343,'李四');
select * from blogs;
select * from users;
select * from blogs;
select version();
```

* bin www.js 启动http服务 并监听 端口
* app.js 处理业务共同逻辑 比如相同的响应头  并处理路由

* router.js 处理路由 并 引用 controller 处理业务比如查看数据库

* exec 返回 promise   则 controller 返回也是 promise router -> app.js

# cookie
* 存储在浏览器的一段字符串（最大5kb）
* 跨域不共享
* 每次发送http请求，会将请求域的 cookie一起发送给sever
* server可以修改cookie 并返回给浏览器。
* 浏览器中也可以通过js修改 cookie（有限制 http only）

* session 
* session 直接是js变量 放在 node.js的进程内存中
* 进程内存有限,访问量过大,内存暴增
* 正式线上是多进程,多进程之间内存无法共享

* redis
