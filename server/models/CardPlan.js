import mongoose from 'mongoose';

const cardPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    websiteType: {
        type: String,
        required: true
    },
    planType: {
        type: String,
        required: true,
        enum: ['Budget', 'Business', 'Professional']
    },
    planPrice: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true,
        default: 0  // 0 indicates uncapped/no budget
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CardPlan = mongoose.model('CardPlan', cardPlanSchema);

export default CardPlan;
