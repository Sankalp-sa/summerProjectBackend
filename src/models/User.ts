import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    Alt_phone: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Student', 'Admin', 'Faculty'],
        default: 'Student'
    }
});

const User = mongoose.model('User', userSchema);

export {User};