const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname,'data.txt')

fs.readFile(fileName,(err,data)=>{
    if(err){
        console.log(err)
        return 
    }
    console.log(data.toString())
})

const content = '这是新写入的内容\n'
const opt = {
    flag:'a'
}
fs.writeFile(fileName,content,opt,(err)=>{
    if(err){
        console.log(err)
    }
})

fs.exists(fileName,(exists)=>{
    console.log(exists)
})