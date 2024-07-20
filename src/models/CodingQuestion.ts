import mongoose from "mongoose";

const CodingQuestionSchema = new mongoose.Schema({
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

const CodingQuestion = mongoose.model('CodingQuestion', CodingQuestionSchema);

export default CodingQuestion;

