import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { firstName, email, message } = req.body;

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
            subject: `New Contact Form Message from ${firstName}`,
            text: `
Name: ${firstName}
Email: ${email}
Message: ${message}
            `,
            html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${firstName}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            code: 200,
            message: 'Message sent successfully' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            code: 500,
            message: 'Error sending message' 
        });
    }
}
