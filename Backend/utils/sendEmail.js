import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendVerificationEmail = (email, token) => {
    const verificationUrl = `http://localhost:5001/api/v1/user/verify-email?token=${token}`;
    
    return transporter.sendMail({
       from: `CareerXpert ${process.env.EMAIL_USER}`,
       to: email,
       subject: "Verify your email",
       html: `<p>Please verify your email by clicking on the link below:</p>
            <a href="${verificationUrl}">Verify Email</a>`,
    }); 
};

export const sendEmail = async (options) => {
    const mailOptions = {
        from: `Rudra Patel ${process.env.EMAIL_USER}`, // Replace with your email or service email
        to: options.email,
        subject: options.subject,
        text: options.message, // Plain text body
        // html: options.html, // Uncomment to send HTML email
    };

    await transporter.sendMail(mailOptions);
};

  



