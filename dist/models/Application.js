"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const applicationSchema = new Schema({
    Student_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const Application = mongoose_1.default.model('Application', applicationSchema);
exports.default = Application;
//# sourceMappingURL=Application.js.map