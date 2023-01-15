const sgMail = require('@sendgrid/mail')
const { model } = require('mongoose')
sgMail.setApiKey(process.env.SGMAILGRID_API_KEY)

const sendWelcomeEmail = (request) =>{
    sgMail.send({
        to:request.email,
        from:'rachit0505@gmail.com',
        Subject:'Welcome to Task Manager App',
        text:`Welcome ${request.name}`
    })
}
const sendDeleteUserEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:'rachit0505@gmail.com',
        Subject:'GoodBye from Task Manager App',
        text:`GoodBye ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteUserEmail
}



