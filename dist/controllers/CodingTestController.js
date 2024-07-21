"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCodingTest = exports.createCodingTest = exports.getSingleCodingTest = exports.getcodingtest = void 0;
// import { Request,Response,NextFunction/ } from "openai/_shims/registry.mjs";
// import CodingQuestion from '../models/CodingQue';
const codingTest_1 = __importDefault(require("../models/codingTest"));
const getcodingtest = async (req, res, next) => {
    try {
        const codingtest = await codingTest_1.default.find({});
        return res.status(200).json({
            codingtest
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getcodingtest = getcodingtest;
const getSingleCodingTest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const codingtest = await codingTest_1.default.findById(id);
        return res.status(200).json({
            codingtest
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getSingleCodingTest = getSingleCodingTest;
const createCodingTest = async (req, res, next) => {
    try {
        const { test_name, Test_questions } = req.body;
        const newCodingQuestion = new codingTest_1.default({
            Test_name: test_name,
            Test_questions,
        });
        const isexist = await codingTest_1.default.find({ Test_name: test_name });
        if (isexist.length > 0) {
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
//# sourceMappingURL=CodingTestController.js.map