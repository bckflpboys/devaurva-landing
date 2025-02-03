import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import CustomPlan from '../server/models/CustomPlan.js';

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
        
        const { name, email, phone, websiteType, features, totalPrice } = req.body;
        
        const customPlan = new CustomPlan({
            name,
            email,
            phone,
            websiteType,
            features,
            totalPrice,
            date: new Date()
        });

        savedPlan = await customPlan.save();

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Format features for email
        const formattedFeatures = features.map(feature => 
            `- ${feature.name}: R${feature.price}`
        ).join('\\n');

        const formattedFeaturesHtml = features.map(feature => 
            `<li>${feature.name}: R${feature.price}</li>`
        ).join('');
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
            subject: `New Custom Plan Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Website Type: ${websiteType}

Selected Features:
${formattedFeatures}

Total Price: R${totalPrice}
            `,
            html: `
<h2>New Custom Plan Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Website Type:</strong> ${websiteType}</p>

<h3>Selected Features:</h3>
<ul>
${formattedFeaturesHtml}
</ul>

<p><strong>Total Price:</strong> R${totalPrice}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            success: true,
            message: 'Custom plan submitted successfully',
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
