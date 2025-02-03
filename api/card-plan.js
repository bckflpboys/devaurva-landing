import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import CardPlan from '../server/models/CardPlan.js';

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
        return res.status(405).json({ message: 'Method not allowed' });
    }

    let savedPlan = null;

    try {
        // Connect to MongoDB
        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(process.env.MONGODB_URI);
        }
        
        const { name, email, phone, websiteType, planType, planPrice, budget } = req.body;
        
        const cardPlan = new CardPlan({
            name,
            email,
            phone,
            websiteType,
            planType,
            planPrice,
            budget,
            date: new Date()
        });

        savedPlan = await cardPlan.save();

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
            subject: `New Card Plan Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Website Type: ${websiteType}
Plan Type: ${planType}
Plan Price: R${planPrice}
Budget: R${budget}
            `,
            html: `
<h2>New Card Plan Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Website Type:</strong> ${websiteType}</p>
<p><strong>Plan Type:</strong> ${planType}</p>
<p><strong>Plan Price:</strong> R${planPrice}</p>
<p><strong>Budget:</strong> R${budget}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            success: true,
            message: 'Card plan submitted successfully',
            plan: savedPlan
        });
    } catch (error) {
        console.error('Error:', error);
        // If we saved the plan but email failed, still return partial success
        if (savedPlan) {
            res.status(207).json({ 
                success: true,
                message: 'Plan saved but email notification failed',
                error: error.message,
                plan: savedPlan
            });
        } else {
            res.status(500).json({ 
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    }
}
