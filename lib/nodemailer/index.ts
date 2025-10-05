import nodemailer from "nodemailer";
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/template";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

// using the above configuration to send emails
export const sendWelcomeEmail = async( { name, email, intro}: WelcomeEmailData ) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace(`{{name}}`, name)
        .replace(`{{intro}}`, intro);

    const mailOptions = {
        from: `"Signalist" <signalist@welcome.pro>`,
        to: email,
        subject: `Welcome to Signalist - your stock market toolkit is ready!`,
        text: 'Thanks for joining Signalist',
        html: htmlTemplate
    }

    await transporter.sendMail(mailOptions)
}