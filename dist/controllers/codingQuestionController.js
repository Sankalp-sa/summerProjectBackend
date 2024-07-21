"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCodingTest = exports.createCodingTest = void 0;
// import { Request,Response,NextFunction/ } from "openai/_shims/registry.mjs";
// import CodingQuestion from '../models/CodingQue';
const codingTest_1 = __importDefault(require("../models/codingTest"));
const createCodingTest = async (req, res, next) => {
    try {
        const { test_name, Test_questions } = req.body;
        const newCodingQuestion = new codingTest_1.default({
            test_name,
            Test_questions,
        });
        const isexist = await codingTest_1.default.find({ Test_name: test_name });
        if (isexist) {
            return res.json("Cannot Duplicate test name");
        }
        await newCodingQuestion.save();
        return res.status(200).json({
            message: "Test created successfully"
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createCodingTest = createCodingTest;
const deleteCodingTest = async (req, res, next) => {
    try {
        const { test_id } = req.body;
        const deleteTest = await codingTest_1.default.findByIdAndDelete(test_id);
        return res.status(200).json({
            message: "Test deleted successfully"
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteCodingTest = deleteCodingTest;
//# sourceMappingURL=codingQuestionController.js.map