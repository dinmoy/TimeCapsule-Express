const express = require('express')
const { Letter } = require('../models')
const multer=require('multer')
const path=require('path')
const fs= require('fs')
const router = express.Router()

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const uploadPath='uploads/'
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath)
        }
        cb(null,uploadPath)
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    },
})
const upload=multer({storage})

//캡슐 이미지 업로드
router.post('/capsule',upload.single('capsuleImage'),async(req,res)=>{
    try{
        const {filename,path:filePath}=req.file

        const letterId=req.body.letterId
        const letter=await Letter.findByPk(letterId)
        if(letter){
            letter.capsule=path.relative(path.join(__dirname,'..'),filePath)
            await letter.save()
            res.status(200).json({
                success:true,
                message:'CapsuleImage uploaded successfully',
                capsule:letter.capsule
            })
        }else{
            res.status(404).json({
                success:false,
                message:'Letter not found'
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Error uploading capsuleImage'

        })
    }
})

//편지 생성
router.post('/', async (req, res) => {
    try {
        const { recipient, email, content, capsule, music_id } = req.body
        const newLetter = await Letter.create({
            recipient,
            email,
            content,
            capsule,
            music_id,
        })
        return res.status(200).json(newLetter);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error create letter' })
    }
})

//모든 편지 조회
router.get('/', async (req, res) => {
    try {
        const letters = await Letter.findAll()
        return res.status(200).json(letters)
    } catch (error) {
        return res.status(500).json({ error: 'Error reading all letters' })
    }
})

//캡슐 전체 조회
router.get('/capsule',async(req,res)=>{
    try{
        const capsules=await Letter.findAll({
            attributes:['capsule']
        })
        return res.status(200).json(capsules)
    }catch(error){
        return res.status(500).json({error: 'Error reading all capsuleImages'})
    }
})

//편지Id로 특정 편지 조회
router.get('/:id', async (req, res) => {
    try {
        const letterId = req.params.id
        const letter = await Letter.findByPk(letterId)
        if (letter) {
            return res.status(200).json(letter)
        } else {
            return res.status(404).json({ error: 'Letter Not Found' })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error reading letter' })
    }
})

module.exports = router