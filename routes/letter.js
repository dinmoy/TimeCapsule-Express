const express = require('express')
const { Letter } = require('../models')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const mailer = require('./mailSender')
const cron = require('node-cron')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/'
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath)
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})
const upload = multer({ storage })

//캡슐 이미지 업로드
router.post('/capsule', upload.single('capsuleImage'), async (req, res) => {
    try {
        const { filename, path: filePath } = req.file
        const letter = await Letter.create({
            capsule: path.relative(path.join(__dirname, '..'), filePath) 
        });

        res.status(200).json({
            success: true,
            message: 'CapsuleImage uploaded successfully',
            capsule: letter.capsuleImage 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error uploading capsuleImage'
        })
    }
})

//편지 업데이트
router.patch('/:id', async (req, res) => {
    try {
        const letterId=req.params.id
        const { recipient, email, content} = req.body
        const newLetter = await Letter.update(
            {recipient, email,content },
            {where:{id:letterId}
        })
        return res.status(200).json();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error create letter' })
    }
})

// 편지의 노래 컬럼 업데이트
router.patch('/:id/music',async(req,res)=>{
    try{
        const letterId=req.params.id
        const {music_id}=req.body
        const updateLetter=await Letter.update(
            {music_id},
            {where:{id:letterId}}
        )
        return res.status(200).json()
    }catch(error){
        console.log(error)
        return res.status(500).json({error: 'Error update letter with music'})
    }
})

const sendEmails = async () => {
    try {
        const users = await Letter.findAll({ where: { emailSent: 0 } });
        for (const user of users) {
            const emailParam = {
                toEmail: user.email,
                subject: 'TimeCapsule',
                text: `${user.email}님에게`,
            }
            
            //이메일 주소 유효성 검사 / 이메일 주소가 없으면 스킵
            if (!emailParam.toEmail) {
                console.log('No email recipient defined for user:', user.id)
                continue
            }

            try {
                await mailer.sendEmail(emailParam)
                user.emailSent = 1
                await user.save()
                console.log('Success send Email:', user.email)
            } catch (error) {
                console.log('Error send Email:', user.email, ':', error)
            }
        }
    } catch (error) {
        console.log('Error send Emails:', error)
    }
}

cron.schedule('1 0 0 1 1 *', sendEmails);


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
router.get('/capsule', async (req, res) => {
    try {
        const capsules = await Letter.findAll({
            attributes: ['capsule']
        })
        return res.status(200).json(capsules)
    } catch (error) {
        return res.status(500).json({ error: 'Error reading all capsuleImages' })
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