const {getList,getDetail,newBlog,updateBlog}  = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req,res)=>{
    const id = req.query.id
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    if(method === 'GET'&&path==='/api/blog/list'){
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author,keyword)
        return new SuccessModel(listData)
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
        return {
            msg:'删除博客'
        }
    }
}

module.exports = handleBlogRouter