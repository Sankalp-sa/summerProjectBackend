import mongoose from "mongoose";

const PracticeQuestionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    CodingQuestionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodingQuestion',
        required: true
    },
    practiceStatus: {
        type: String,
        enum: ['not attempted', 'attempted', 'solved'],
        default: 'not attempted'
    },
});

const PracticeQuestion = mongoose.model('PracticeQuestion', PracticeQuestionSchema);
export default PracticeQuestion;

