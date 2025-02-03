import mongoose from 'mongoose';
import CustomPlan from '../server/models/CustomPlan.js';

export default async function handler(req, res) {
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
