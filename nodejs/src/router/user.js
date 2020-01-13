const {login} = require('../controller/user')
const {ErrorModel,SuccessModel} = require('../model/resModel')



const handleUserRouter = (req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    if(method === 'POST'&& path === '/api/user/login'){
       const {username,password} =req.body
       const result = login(username,password)
    return result.then(data=>{
        if(data.username){
            req.session.username = data.username
            req.session.realName = data.realName
            return new SuccessModel()
        }else{
            return new ErrorModel('登录失败')
        }
    })
    }
    if(method === 'GET'&&req.path==='/api/user/login-test'){
        if(req.session.username){
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    } 
}
module.exports = handleUserRouter