
import path from 'path';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
    res.json({ message: "hello from server!" });
});

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to send");
    }
});

app.post("/api/contact", (req, res) => {
    const name = `${req.body.firstName} ${req.body.lastName}`;
    const email = req.body.email;
    const message = req.body.message;
    
    const mail = {
        from: name,
        to: process.env.EMAIL_ADDRESS,
        subject: "DevAura - Form Submission",
        html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        `
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json(error);
        } else {
            res.json({ code: 200, status: "Message Sent" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is online on port: ${PORT}`);
});

