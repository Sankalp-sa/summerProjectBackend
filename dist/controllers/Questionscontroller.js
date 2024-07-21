"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletequestion = exports.viewquestion = exports.modifyquestion = exports.createquestion = void 0;
const Question_js_1 = __importDefault(require("../models/Question.js"));
const Test_js_1 = __importDefault(require("../models/Test.js"));
// import Question from "../models/Question.js"
const createquestion = async (req, res, next) => {
    const { test_id, question, option1, option2, option3, option4, correctoption, } = req.body;
    const test = await Test_js_1.default.findById(test_id);
    if (!test) {
        return res.status(401).json({
            message: "Test not found",
        });
    }
    console.log(req.body);
    const new_question = new Question_js_1.default({
        question,
        option1,
        option2,
        option3,
        option4,
        correctoption: req.body.correct_option,
    });
    const existingquestion = await Question_js_1.default.findOne({ question });
    //  Question.delete({
    //  })
    if (existingquestion) {
        return res.status(401).json({
            message: "Question already exist",
        });
    }
    const newQuestion = await new_question.save();
    test.questionArray.push(newQuestion._id);
    await test.save();
    return res.status(200).json({ message: "question created successfully" });
};
exports.createquestion = createquestion;
const modifyquestion = async (req, res, next) => {
    const { id, question, option1, option2, option3, option4, correctoption } = req.body;
    const updateit = await Question_js_1.default.findByIdAndUpdate(id, {
        question,
        option1,
        option2,
        option3,
        option4,
        correctoption,
    });
    // update the score of students who had given the above test
    // find the tests who have the above question and update the question
    const tests = await Test_js_1.default.find({ questionArray: { $in: [id] } });
    return res.status(200).json({ message: "Question successfully updated" });
};
exports.modifyquestion = modifyquestion;
const viewquestion = async (req, res, next) => {
    const { id } = req.params;
    const viewques = await Question_js_1.default.findById(id);
    return res.status(200).json(viewques);
};
exports.viewquestion = viewquestion;
const deletequestion = async (req, res, next) => {
    const { id } = req.body;
    const deleteques = await Question_js_1.default.findByIdAndDelete(id);
    await Test_js_1.default.updateMany({}, { $pull: { questionArray: id } }, { multi: true });
    return res.status(200).json({ ok: true, message: "Deleted question successfully" });
};
exports.deletequestion = deletequestion;
//# sourceMappingURL=Questionscontroller.js.map