const {login} = require('../controller/user')
const {ErrorModel,SuccessModel} = require('../model/resModel')

const getCookieExpires = ()=>{
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}

const handleUserRouter = (req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    if(method === 'POST'&& path === '/api/user/login'){
       const {username,password} =req.body
       const result = login(username,password)
    //    if(result){
    //        return new SuccessModel()
    //    }else{
    //        return new ErrorModel('登录失败')
    //    }
    return result.then(data=>{
        if(data.username){
            return new SuccessModel()
        }else{
            return new ErrorModel('登录失败')
        }
    })
    }
    if(method === 'GET'&&req.path==='/api/user/login-test'){
        if(req.cookie.username){
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    } 
}
module.exports = handleUserRouter