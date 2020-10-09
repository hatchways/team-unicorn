const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRIDAPIKEY)


const sendEmail = (msg) => {
  sgMail.send(msg)
    .then(() => console.log('Email Sent'))
    .catch((err) => console.error(err))
}

const createMessage = (to, subject, text) => ({
  to: to,
  from: 'hatchunicorn@gmail.com',
  subject: subject,
  text: text,
})


module.exports = {sendEmail, createMessage};