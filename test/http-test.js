const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const quey = querystring.parse(url.split('?')[1])
    res.setHeader('Content-type','application/json')
    const resData = {
        method,
        url,
        path,
        quey
    }
    console.log('resData:',JSON.stringify(resData))
    if(method ==='GET'){
        res.end(JSON.stringify(resData))
    }
    if(method === 'POST'){
        let postData = ''
        req.on('data',chunk=>{
            console.log('chunk:',chunk)
            postData += chunk.toString()
        })
        req.on('end',()=>{
            resData.postData = postData
            console.log('resData:',resData)
            res.end(JSON.stringify(resData))
        })
    }
})

server.listen(8000,()=>{
    console.log('server is listen 8000')
})