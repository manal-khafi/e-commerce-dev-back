require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Function to send an email
const sendingMail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = sendingMail;

