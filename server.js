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
        const { firstName, email, message } = req.body;
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER, // Send to specified recipient or self
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
        
        console.log('Email sent successfully');
        res.status(200).json({ 
            code: 200,
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
            websiteType,
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
                <p><strong>Website Type:</strong> ${websiteType}</p>
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