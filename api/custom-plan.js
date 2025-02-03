import mongoose from 'mongoose';
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

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const { name, email, phone, websiteType, features, budget } = req.body;
        
        const customPlan = new CustomPlan({
            name,
            email,
            phone,
            websiteType,
            features,
            budget,
            date: new Date()
        });

        await customPlan.save();
        
        res.status(200).json({ message: 'Custom plan submitted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
