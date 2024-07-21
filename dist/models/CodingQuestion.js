"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CodingQuestionSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    tags: [String],
    solution: { type: String, required: true },
    testCases: [{
            input: { type: String, required: true },
            output: { type: String, required: true },
        }],
    createdAt: { type: Date, default: Date.now },
    variables: [{
            name: { type: String, required: true },
            dataType: { type: String, required: true },
            upperBound: { type: Number },
            lowerBound: { type: Number },
        }],
    isPractice: { type: Boolean, default: false },
});
const CodingQuestion = mongoose_1.default.model('CodingQuestion', CodingQuestionSchema);
exports.default = CodingQuestion;
//# sourceMappingURL=CodingQuestion.js.map