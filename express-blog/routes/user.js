var express = require('express')
var router = express.Router()
var {login} = require('../controller/user.js')
var {SuccessModel,ErrorModel} = require('../model/resModel')
router.post('/login',function(req,res,next){
   const {username,password} = req.body
   const result = login(username,password)
return result.then(data=>{
    console.log('-----login:',data)
    if(data.username||data.id){
        req.session.username = data.username
        req.session.realName = data.realName
        res.json(
            new SuccessModel()
        )
    }else{
        res.json(
            new ErrorModel('登录失败')
        )
    }
    
})
})
router.get('/session-test',(req,res,next)=>{
    const session = req.session
    if(session.viewNum=== null){
        session.viewNum = 0
    } 
    session.viewNum ++
    res.json({
    viewNum:session.viewNum 
    })
})



module.exports = router