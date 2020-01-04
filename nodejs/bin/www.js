const http  = require('http')
const PORT = 8000
const serverHandle = require('../app')


const server = http.createServer(serverHandle)

server.listen(PORT,()=>{
    console.log(`server is listen http://127.0.0.1:${PORT}`)
})