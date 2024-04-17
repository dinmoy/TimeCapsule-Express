const express=require('express')
const {Letter}=require('../models')

const router=express.Router()

//편지 생성
router.post('/',async(req,res)=>{
    try{
        const {recipient,email,content,capsule,music_id}=req.body
        const newLetter=await Letter.create({
            recipient,
            email,
            content,
            capsule,
            music_id,
        })
        return res.status(200).json(newLetter);
    }catch(error){
        console.log(error)
        return res.status(500).json({error : 'Error create letter'})
    }
})

module.exports=router