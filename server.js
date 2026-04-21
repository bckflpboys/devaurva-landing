import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import CustomPlan from './server/models/CustomPlan.js';
import CardPlan from './server/models/CardPlan.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Enable CORS for your frontend
app.use(cors({
    origin: 'http://localhost:5173' // Your Vite frontend URL
}));

// Parse JSON bodies
app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { firstName, email, message, categories } = req.body;
        
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
        
        console.log('Email sent successfully');
        res.status(200).json({ 
            success: true,
            message: 'Message sent successfully' 
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ 
            code: 500,
            message: 'Error processing your request' 
        });
    }
});

// Custom Plan endpoint
app.post('/api/custom-plan', async (req, res) => {
    try {
        const { name, email, phone, companyName, selectedFeatures, additionalNotes, websiteType, totalPrice } = req.body;
        
        // Create new custom plan document
        const customPlan = new CustomPlan({
            name,
            email,
            phone,
            companyName,
            selectedFeatures,
            additionalNotes,
            websiteType: websiteType || 'Custom', // Set default if not provided
            totalPrice
        });

        // Save to database
        await customPlan.save();

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
            subject: `New Custom Plan Request from ${name}`,
            html: `
                <h2>New Custom Plan Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Company:</strong> ${companyName || 'Not provided'}</p>
                <p><strong>Website Type:</strong> ${websiteType || 'Custom'}</p>
                <p><strong>Total Price:</strong> R${totalPrice.toLocaleString()}</p>
                <h3>Selected Features:</h3>
                <ul>
                    ${selectedFeatures.map(feature => `
                        <li>
                            <strong>${feature.name}</strong> - R${feature.price.toLocaleString()}
                            ${feature.description ? `<br/><em>${feature.description}</em>` : ''}
                        </li>
                    `).join('')}
                </ul>
                ${additionalNotes ? `
                    <h3>Additional Notes:</h3>
                    <p>${additionalNotes}</p>
                ` : ''}
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: 'Custom plan request submitted successfully' });
    } catch (error) {
        console.error('Error processing custom plan request:', error);
        res.status(500).json({ error: 'Failed to process custom plan request' });
    }
});

// Card Plan endpoint
app.post('/api/card-plan', async (req, res) => {
    try {
        const { name, email, phone, websiteType, planType, planPrice, budget } = req.body;
        
        // Create new card plan document
        const cardPlan = new CardPlan({
            name,
            email,
            phone,
            websiteType,
            planType,
            planPrice,
            budget
        });

        // Save to database
        await cardPlan.save();

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
            subject: `New ${planType} Plan Request from ${name}`,
            html: `
                <h2>New ${planType} Plan Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Website Type:</strong> ${websiteType}</p>
                <p><strong>Selected Plan:</strong> ${planType}</p>
                <p><strong>Plan Price:</strong> R${planPrice.toLocaleString()}</p>
                <p><strong>Client Budget:</strong> ${budget === 0 ? 'Uncapped/No Budget' : `R${budget.toLocaleString()}`}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: 'Plan request submitted successfully' });
    } catch (error) {
        console.error('Error processing card plan request:', error);
        res.status(500).json({ error: 'Failed to process plan request' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});