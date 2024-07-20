import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    Student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {   
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    ssc_percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    hsc_percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    jee_percentile: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    gujcet_percentile: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    id_proof: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
