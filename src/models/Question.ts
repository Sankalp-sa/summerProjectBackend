import mongoose, { Document, Schema } from 'mongoose';
import Questions from '../routes/Questions_routes';

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
const questionSchema = new Schema({
//   num : {type : Number },
  question : { type: String, required: true },
  option1 : {type:String ,required:true},
  option2 : {type : String , required :true},
  option3 : {type:String  },
  option4 : {type : String },
 correctoption : {type : Number , required : true}, 
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
const Question = mongoose.model("Questions",questionSchema)

export default Question;
