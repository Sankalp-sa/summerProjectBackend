import { startTest } from './../controllers/testcontroller';
import mongoose, { Document, Model, Schema } from 'mongoose';
// import CodingQuestion from './CodingQuestion';

// Define the response interface
interface IResponse extends Document {
  testId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  score : Number;
  responses: {
    questionId: mongoose.Types.ObjectId;
    answer: Number;
  }[];
  Coding_responses:{
    Coding_question : mongoose.Types.ObjectId;
    CodingQuestion_score : Number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  given: Boolean;
  isStarted: Boolean;
  startTime: Date;
}

// Define the response schema
const responseSchema = new Schema<IResponse>({
  testId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Test'
  },
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  score: {
    type: Number,
  },
  responses: [{
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    },
    answer: {
      type: Number,
    }
  }],
  Coding_responses: [{
    Coding_question: {
      type: Schema.Types.ObjectId,
      ref: 'CodingQuestion'
    },
    CodingQuestion_score: {
      type: Number,
      default : 0,
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
const StudentResponse: Model<IResponse> = mongoose.model<IResponse>('StudentResponse', responseSchema);

export default StudentResponse;
