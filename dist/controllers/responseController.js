"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatescore = void 0;
const response_1 = __importDefault(require("../models/response"));
const Question_1 = __importDefault(require("../models/Question"));
const calculatescore = async (req, res, nex) => {
    try {
        const { student, testid, question_array } = req.body;
        let marks = 0;
        for (let i = 0; i < question_array.length; i++) {
            const i_d = await Question_1.default.findById(question_array[i].questionId);
            if (question_array[i].answer != -1) {
                if (question_array[i].answer == i_d.correctoption) {
                    marks += 1;
                }
                else {
                    marks -= 1;
                }
            }
        }
        console.log(student, testid, question_array);
        const new_res = new response_1.default({
            testId: testid,
            studentId: student,
            score: marks,
            responses: question_array,
        });
        await new_res.save();
        return res.status(200).json({
            message: "Score calculated successfully"
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.calculatescore = calculatescore;
//# sourceMappingURL=responseController.js.map