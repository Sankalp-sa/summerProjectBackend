"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const studentSchema = new Schema({
    student_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    dob: {
        type: Date,
        required: true
    },
    father: {
        type: String,
        required: true
    },
    mother: {
        type: String,
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
    }
}, { timestamps: true });
const Student = mongoose_1.default.model('Student', studentSchema);
exports.default = Student;
//# sourceMappingURL=Student.js.map