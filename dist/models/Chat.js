"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("crypto");
const chatSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: (0, crypto_1.randomUUID)(),
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
const Chat = mongoose_1.default.model('Chat', chatSchema);
//# sourceMappingURL=Chat.js.map