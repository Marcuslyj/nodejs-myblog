const querystring = require('querystring')
const   handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req)=>{
    const promise = new Promise((resolve,reject)=>{
        if(req.method!=='POST'){
            resolve({})
            return 
        }
        if(req.headers['content-type']!== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data',chunk=>{
            postData += chunk.toString()
        })
        req.on('end',()=>{
            console.log('postData',postData)
            // res.end(JSON.stringify(postData))
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })

    })
    return promise
}
const serverHandle = (req,res)=>{
    res.setHeader('Content-type','application/json')
    // 获取path
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])


    getPostData(req).then(postData=>{ // 接受post的数据并挂载到 req.body上
        req.body = postData
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
    })
}
module.exports = serverHandle