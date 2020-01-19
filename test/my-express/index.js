const http = require('http')
const slice = Array.prototype.slice


class myExpress{
   constructor (){
       this.routes = {
           all:[],
           get:[],
           post:[]
       }
   }
   register(path){
     const info = {}
     console.log('register:',path)
     if(typeof path == 'string'){
         info.path = path
         info.stack = slice.call(arguments,1)
     }else {
         info.path = '/'
         info.stack  = slice.call(arguments,0)
     }
     return info
   }
   use(){
    //    
    console.log('use:',this)
    const info = this.register.apply(this,arguments) // apply 指定this 
    this.routes.all.push(info)
   }
   get(){
    const info = this.register.apply(this,arguments)
    this.routes.get.push(info)
   }
   post(){
    const info = this.register.apply(this,arguments)
    this.routes.post.push(info)
   }
   match(method,url){
    let stack  = []
    if(url === '/favicon.ico'){ // favicon.ico
        return []
    }
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])
    curRoutes.forEach(routeInfo=>{
        if(url.indexOf(routeInfo.path) === 0){
            // 字符串的indexOf
            // indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配
        stack = stack.concat(routeInfo.stack)
        
        }
    })
    return stack
   }
   handle(req,res,stack){
    const next = ()=>{
        const middleware = stack.shift()
        if(middleware){
            middleware(req,res,next)
        } 
    }
    // 递归
    next(req,res,next)
    
   }
   callback(){
    return (req,res)=>{
        res.json = (data)=>{
            res.setHeader('Content-type','application/json')
            res.end(JSON.stringify(data))
        }
        console.log('callback')
        const url = req.url
        const method = req.method.toLowerCase()
        console.log(`url:${url},method:${method}`)
        const resultList = this.match(method,url)
        console.log('resultList:',resultList)
        this.handle(req,res,resultList)
    }
   }
   listen(...args){
    const server = http.createServer(this.callback())
    server.listen(...args)
   }
}

module.exports = ()=>{
    return new myExpress()
}