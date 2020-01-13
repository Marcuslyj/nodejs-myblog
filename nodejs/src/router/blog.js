const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = (req)=>{
  if(!req.session.username){
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
  
}
const handleBlogRouter = (req, res) => {
  const id = req.query.id;
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];
  if (method === "GET" && path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const result = getList(author, keyword);
    return result
      .then(listData => {
        return new SuccessModel(listData);
      })
      .catch(err => {
        console.log("getList:", err);
      });
  }
  if (method === "GET" && path === "/api/blog/detail") {
    // const data = getDetail(id)
    // return new SuccessModel(data)
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }
  if (method === "POST" && path === "/api/blog/new") {
    const blogData = req.body;
    // const data = newBlog(blogData)
    // return new SuccessModel(data)
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      // 尚未登录
      return loginCheck
    }
    blogData.author = req.session.username
    const result = newBlog(blogData);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }
  if (method === "POST" && path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      // 尚未登录
      return loginCheck
    }
    const result = updateBlog(req.body.id, req.body);
    // if(result){
    //     return new SuccessModel()
    // }else {
    //     return new ErrorModel('更新blog错误')
    // }
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新blog错误");
      }
    });
  }
  if (method === "POST" && path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      // 尚未登录
      return loginCheck
    }
    const blogData = req.body;
    blogData.author = req.session.username
    const result = delBlog(req.body.id, req.body.author);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除blog错误");
      }
    });
  }
};

module.exports = handleBlogRouter;
