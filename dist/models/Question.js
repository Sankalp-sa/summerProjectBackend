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
// Interface for the option
// interface IOption {
//   text: string;
// //   isCorrect: boolean;
// }
// // Interface for the question document
// interface IQuestion extends Document {
//   text: string;
//   options: IOption[];
// }
// // Define the schema for the options
// const optionSchema = new Schema<IOption>({
//   text: { type: String, required: true },
// //   isCorrect: { type: Boolean, required: true }
// });
// Define the schema for the question
const questionSchema = new mongoose_1.Schema({
    //   num : {type : Number },
    question: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String },
    option4: { type: String },
    correctoption: { type: Number, required: true },
    //   options: { type: [optionSchema], required: true, validate: [arrayLimit, 'Options array must contain exactly four options'] },
});
// Custom validator to ensure exactly four options
// function arrayLimit(val: IOption[]) {
//   return val.length <= 4;
// }
// Pre-save hook to update the 'updatedAt' field on modification
// questionSchema.pre<IQuestion>('save', function (next) {
// //   this.updatedAt = new Date();/
//   next();
// });
// Compile the model from the schema
// const Question = mongoose.model<IQuestion>('Question', questionSchema);
const Question = mongoose_1.default.model("Questions", questionSchema);
exports.default = Question;
//# sourceMappingURL=Question.js.map