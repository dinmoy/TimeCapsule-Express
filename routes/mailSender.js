const nodemailer = require('nodemailer')
require('dotenv').config()

const mailSender = {
    sendEmail: function (param) {
        const transporter = nodemailer.createTransport({
            port: 587,
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PW,
            },
        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: param.toEmail,
            subject: param.subject,
            html: '<h3>TimeCapsule</h3><p>아래 링크를 눌러 작년에 쓴 나의 편지를 확인해보세요</p><a href="http://naver.com">📨 나의 편지 확인하러 가기</a>'
            +'<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbk6uhT%2FbtsHQSGPq1T%2Fk5JoB3bMkodPiITDtVlhFk%2Fimg.png"/>',
            attachments: param.attachments,
        }
        return transporter.sendMail(mailOptions)
    },
}

module.exports = mailSender
