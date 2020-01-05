const fs = require('fs')
const path = require('path')

function getContentFile(fileName,callback){
    const fullFileName = path.resolve(__dirname,'files',fileName)
    fs.readFile(fullFileName,(err,data)=>{
        if(err){
            console.log(err)
            return
        }
        callback(data.toString())
    })
}
// getContentFile('a.json',aData=>{
//     console.log('this is a :',aData)
//     getContentFile('b.json',bData=>{
//         console.log('this is b:',bData)
//         getContentFile('c.json',cData=>{
//             console.log('this is c:',cData)
//         })
//     })
// })

function getContentFileByPromise(fileName){
//   console.log(fileName)
  const fullFileName = path.resolve(__dirname,'files',fileName)
  const promise = new Promise((resolve,reject)=>{
    fs.readFile(fullFileName,(err,data)=>{
        // console.log(err)
        if(err){
            reject(err)
            return
        }
        resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}
getContentFileByPromise('a.json').then(aData=>{
    console.log('this is aData',aData,aData.msg)
    return getContentFileByPromise(aData.next)
}).then(bData=>{
    console.log('this is bData:',bData,bData.msg)
    return getContentFileByPromise(bData.next)
}).then(cData=>{
    console.log('this cData:',cData.msg)
}).catch(err=>{
    console.log(err)
})