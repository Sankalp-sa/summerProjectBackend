import mongoose  from 'mongoose';

const notificationSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Everyone', 'all-applicants', 'Pending', 'Accepted', 'Rejected', 'Specific'],
        default: 'Everyone'
    },
    message: {
        type: String,
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    send: {
        type: Boolean,
        default: false,   
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;