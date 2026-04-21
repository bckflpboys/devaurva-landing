import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false,
            message: 'Method not allowed' 
        });
    }

    try {
        const { firstName, email, message, categories } = req.body;

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
            subject: `New DevAura Enquiry from ${firstName}`,
            text: `
Name: ${firstName}
Email: ${email}
Services: ${categories ? categories.join(', ') : 'None selected'}
Message: ${message}
            `,
            html: `
<div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
    <h2 style="color: #4f46e5;">New Website Enquiry</h2>
    <p><strong>Name:</strong> ${firstName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Selected Services:</strong></p>
    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 15px;">
        ${categories ? categories.map(cat => `<span style="background: #f3f4f6; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; color: #374151;">${cat}</span>`).join(' ') : 'None'}
    </div>
    <p><strong>Message:</strong></p>
    <div style="background: #f9fafb; padding: 15px; border-radius: 10px; border-left: 4px solid #4f46e5;">
        ${message}
    </div>
</div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            success: true,
            message: 'Message sent successfully' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
}
