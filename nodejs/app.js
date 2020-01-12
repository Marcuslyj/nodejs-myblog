const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      console.log("postData", postData);
      // res.end(JSON.stringify(postData))
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};
const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");
  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);
  req.cookie = {}
 const cookieStr = req.headers.cookie || ''
 cookieStr.split(';').forEach(item => {
   if(!item){
     return
   }
   const arr = item.split('=')
   const key = arr[0].trim()
   const val = arr[1].trim()
   req.cookie[key] = val
 })
  getPostData(req).then(postData => {
    // 接受post的数据并挂载到 req.body上
    req.body = postData;
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // const userData = handleUserRouter(req,res)
    // if(userData){
    //     res.end(JSON.stringify(userData))
    //     return
    // }
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData));
      });
      return;
    }
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
};
module.exports = serverHandle;
