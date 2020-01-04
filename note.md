
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
    - user = { id, username,password,realname}
* 如何与前端对接 即接口设计

* 获取博客列表       /api/blog/list          params author
* 获取一篇博客的内容  /api/blog/detail        params  id
* 新增一篇博客       /api/blog/new           
* 更新一篇博客       /api/blog/update        params   id
* 删除一篇博客      /api/blog/del            params    id
* 登录             /api/user/login         params     username  password