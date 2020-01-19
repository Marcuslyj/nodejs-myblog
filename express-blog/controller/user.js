const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    // username = escape(username)
    
    // // 生成加密密码
    // password = genPassword(password)
    // password = escape(password)
console.log(`login-params:`,username,password)
    const sql = `
        select username, realname from users where username='${username}' and password='${password}'
    `
    // console.log('sql is', sql)
    return exec(sql).then(rows => {
        // return rows[0] || {}
        if(rows[0]){
            return rows[0]
        }else{
           return register(username,password)
        }
    })
}
const register = (username,password) => {
    // blogData
    // console.log("blogData:", blogData);
    const sql = `insert into users (username,password,realname) values('${username}','${password}','${username}')`;
    return exec(sql).then(insertData => {
        console.log('register',insertData)
      return {
        id: insertData.insertId
      }
    })
  }
module.exports = {
    login
}