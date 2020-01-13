const redis = require('redis')

const redisClient = redis.createClient(6379,'127.0.0.1')

redisClient.on('error',err=>{
    console.error(err)
})

redisClient.set('myName','justdoit',redis.print)
redisClient.get('myName',(err,val)=>{
    if(err){
        console.error(err)
    }
    console.log('val:',val)
    redisClient.quit()
})

redisClient.set('myAge','28',redis.print)
redisClient.get('myAge',(err,val)=>{
    if(err){
        console.error(err)
    }
    console.log('val:',val)
    redisClient.quit()
})