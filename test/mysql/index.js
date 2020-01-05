const mysql = require('mysql')

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'myblog'
})

con.connect()

let sql = 'select * from users;'
    sql = 'select id from users'
    sql = `update users set realname='李四2' where username='lisi';`
    sql = `insert into users(username,password,realname) values('wangwu','33424','王五');`

con.query(sql,(err,result)=>{
    if(err){
        console.error(err)
        return
    }
    console.log(result)
})
con.end()