const getList = (author,keyword)=>{
    return [
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime:'15434343',
            author:'张三'
        },
        {
            id:2,
            title:'标题',
            content:'内容B',
            createTime:'24342323',
            author:'list'
        }
    ]
}
const getDetail = (id)=>{
    return {
        id:1,
        title:'标题A',
        content:'内容A',
        createTime:'15434343',
        author:'张三'
    }
}
const newBlog = (blogData = {})=>{
    // blogData
    return {
        id:3
    }
}
const updateBlog = (id,blogData={})=>{
    return true  
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog
}