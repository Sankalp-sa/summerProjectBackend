"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    send: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});
const Notification = mongoose_1.default.model('Notification', notificationSchema);
exports.default = Notification;
//# sourceMappingURL=Notification.js.map