import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema({
    
    id: {
        type: String,
        default: randomUUID(),
        required: true
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);