import mongoose from 'mongoose';

const customPlanSchema = new mongoose.Schema({
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
    companyName: {
        type: String,
        required: false
    },
    websiteType: {
        type: String,
        required: true
    },
    features: [{
        id: String,
        name: String,
        price: Number,
        category: String
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const CustomPlan = mongoose.models.CustomPlan || mongoose.model('CustomPlan', customPlanSchema);

export default CustomPlan;
