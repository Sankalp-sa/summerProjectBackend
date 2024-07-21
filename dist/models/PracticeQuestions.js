"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PracticeQuestionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    CodingQuestionId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'CodingQuestion',
        required: true
    },
    practiceStatus: {
        type: String,
        enum: ['not attempted', 'attempted', 'solved'],
        default: 'not attempted'
    },
});
const PracticeQuestion = mongoose_1.default.model('PracticeQuestion', PracticeQuestionSchema);
exports.default = PracticeQuestion;
//# sourceMappingURL=PracticeQuestions.js.map