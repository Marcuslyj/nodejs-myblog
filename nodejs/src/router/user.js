const {loginCheck} = require('../controller/user')
const {ErrorModel,SuccessModel} = require('../model/resModel')
const handleUserRouter = (req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    if(method === 'POST'&& path === '/api/user/login'){
       const {username,password} =req.body
       const result = loginCheck(username,password)
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
}
module.exports = handleUserRouter