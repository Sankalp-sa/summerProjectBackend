import mongoose, { Document, Schema } from 'mongoose';
import CodingQuestion from './CodingQuestion';

const testschema = new Schema({

    test_name : {type : String , required :true},

    questionArray: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
      }],
    Codingtest : {
       type: Schema.Types.ObjectId,
       ref:'CodingTest'
    },
    // date : {type: Date , required : true},
    start_time : {type : Date , required : true},
    end_time : {type : Date , required : true},
    duration : {type : Number , required : true},
    sampleTest: {type: Boolean, default: false},
    // test_id : {type : String , required : true , unique:true}, 
})

const Test = mongoose.model('Test',testschema);
export default Test
