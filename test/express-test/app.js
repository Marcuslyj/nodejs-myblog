const express = require('express')

const app = express()

app.use((req,res,next)=>{
    console.log('请求开始。。。。',req.method,req.url)
    next()
})

app.use((req,res,next)=>{
    req.cookie = {
        userId:'abc123'
    }
    next()
})

app.use((req,res,next)=>{
    // 处理 postdata 异步
    setTimeout(()=>{
        req.body = {
            a:100,
            b:200
        }
        next()
    })
})
app.use('/api',(req,res,next)=>{
    console.log('处理api路由')
    next()
})

app.get('/api',(req,res,next)=>{
    console.log('处理get-api路由')
    next()
})

app.post('/api',(req,res,next)=>{
    console.log('处理post-api路由')
    next()
})


app.get('/api/get-cookie',(req,res,next)=>{
    console.log('get /api/get-cookie')
    res.json({
        errno:0,
        data:req.cookie
    })
})

app.post('/api/get-post-data',(req,res,next)=>{
    console.log('get /api/get-post-data')
    res.json({
        errno:0,
        data:req.body
    })
})
app.use((req,res,next)=>{
    console.log('处理404')
    res.json({
        errno:-1,
        msg:'404 no fount'
    })
})

app.listen(9000,()=>{
    console.log('server is listen 9000')
})