const express=require('express')
const app=express()
const port=3000

app.get('/',(req,res)=>{
    res.send('TimeCapsule')
})

app.listen(port,()=>
    console.log(`server is running ${port}`)
)