const {exec} = require('../db/mysql')
const login = (username,password)=>{
   const sql = `select username,realname from users where username='${username}' and password='${password}'`
   return exec(sql).then(rows=>{
      // return rows[0] || {}
      console.log('------',rows)
     if(rows.length){
        return rows[0]
     }else{
       return register(username,password)
     }
   })
}

const register = (username,password)=>{
   const sql = `insert into users (username,password,realname) values('${username}','${password}','${username}')`
   return exec(sql).then(insertData=>{
      console.log('insertData:',insertData)
      return {
         id:insertData.insertId
      }
   })
}

module.exports = {
    login
}