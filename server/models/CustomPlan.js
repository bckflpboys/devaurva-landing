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
    companyName: {
        type: String,
        required: false
    },
    selectedFeatures: [{
        name: String,
        description: String
    }],
    additionalNotes: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'quoted', 'accepted', 'rejected'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('CustomPlan', customPlanSchema);
