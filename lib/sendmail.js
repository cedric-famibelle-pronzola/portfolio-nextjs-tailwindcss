const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

async function sendMail(data) {
  const {from, subject, message} = data

  const info = await transporter.sendMail({
    from: `FAMIBELLE - WEBSITE <${from}>`,
    to: process.env.SMTP_SEND_TO,
    subject,
    text: message
  })

  console.log('Message sent: %s', info.messageId)

  return info
}

module.exports = {sendMail}
