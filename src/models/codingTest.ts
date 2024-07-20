import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const codingtestSchema = new Schema({
    Test_name : {
        type:String ,
        require:true
    },
    Test_questions: [{
        type : Schema.Types.ObjectId,
        ref : 'CodingQuestion'
    }]

})

const CodingTest  = mongoose.model('CodingTest',codingtestSchema);

export default CodingTest;