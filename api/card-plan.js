import mongoose from 'mongoose';
import CardPlan from '../server/models/CardPlan.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
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
        
        res.status(200).json({ message: 'Card plan submitted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
