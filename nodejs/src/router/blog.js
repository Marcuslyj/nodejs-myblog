const {getList,getDetail,newBlog,updateBlog,delBlog}  = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req,res)=>{
    const id = req.query.id
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    if(method === 'GET'&&path==='/api/blog/list'){
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author,keyword)
   return result.then(listData=>{
        return new SuccessModel(listData)
    }).catch(err=>{
        console.log('getList:',err)
    })
    }
    if(method === 'GET'&&path==='/api/blog/detail'){
        
        const data = getDetail(id)
        return new SuccessModel(data)
    }
    if(method === 'POST'&&path === '/api/blog/new'){
        const blogData = req.body
        const data = newBlog(blogData)
        return new SuccessModel(data)
    }
    if(method === 'POST'&& path === '/api/blog/update'){
        const result = updateBlog(id,req.body)
        if(result){
            return new SuccessModel()
        }else {
            return new ErrorModel('更新blog错误')
        }
    }
    if(method === 'POST'&&path === '/api/blog/del'){
        const result = delBlog(id,req.body)
        if(result){
            return new SuccessModel()
        }else {
            return new ErrorModel('删除blog错误')
        }
    }
}

module.exports = handleBlogRouter