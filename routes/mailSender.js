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
            html: param.html, 
            attachments: param.attachments,
        }
        return transporter.sendMail(mailOptions)
    },
}

module.exports = mailSender
