"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the response schema
const responseSchema = new mongoose_1.Schema({
    testId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Test'
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    score: {
        type: Number,
    },
    responses: [{
            questionId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Question'
            },
            answer: {
                type: Number,
            }
        }],
    Coding_responses: [{
            Coding_question: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'CodingQuestion'
            },
            CodingQuestion_score: {
                type: Number,
                default: 0,
            }
        }],
    given: {
        type: Boolean,
        default: false
    },
    isStarted: {
        type: Boolean,
        default: false
    },
    startTime: {
        type: Date
    },
}, {
    timestamps: true
});
// Create a composite unique index on testId and studentId
responseSchema.index({ testId: 1, studentId: 1 }, { unique: true });
// Create the model
const StudentResponse = mongoose_1.default.model('StudentResponse', responseSchema);
exports.default = StudentResponse;
//# sourceMappingURL=response.js.map