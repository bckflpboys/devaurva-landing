import mongoose from 'mongoose';
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

        await cardPlan.save();
        
        res.status(200).json({ 
            success: true,
            message: 'Card plan submitted successfully' 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}
