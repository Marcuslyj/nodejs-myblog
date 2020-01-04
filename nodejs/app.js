const   handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req,res)=>{
    res.setHeader('Content-type','application/json')
    // const resData  = {
    //     name:'justdoit',
    //     site:'imooc',
    //     env:process.env.NODE_ENV
    // }
    // res.end(JSON.stringify(resData))
    const blogData = handleBlogRouter(req,res)
    if(blogData){
        res.end(JSON.stringify(blogData))
        return
    }
    
    const userData = handleUserRouter(req,res)
    if(userData){
        res.end(JSON.stringify(userData))
        return 
    }

    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 Not Found\n")
    res.end()
}
module.exports = serverHandle