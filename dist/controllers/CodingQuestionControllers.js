"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSinglePracticeQuestionController = exports.getPracticeQuestionController = exports.getSingleCodingQuestionController = exports.getCodingQuestionController = exports.submitPracticeQuestionController = exports.codeSubmitController = exports.createCodingQuestionController = void 0;
const CodingQuestion_1 = __importDefault(require("../models/CodingQuestion"));
const axios_1 = __importDefault(require("axios"));
const language_1 = require("../constants/language");
// import StudentResponse from "../models/response";
const response_1 = __importDefault(require("../models/response"));
const codingTest_1 = __importDefault(require("../models/codingTest"));
const PracticeQuestions_1 = __importDefault(require("../models/PracticeQuestions"));
const API = axios_1.default.create({
    baseURL: "https://emkc.org/api/v2/piston",
});
const createCodingQuestionController = async (req, res) => {
    const { title, description, testCases, solution } = req.body;
    if (!title || !description || !testCases || !solution) {
        return res.status(400).json({
            message: "Please enter all fields",
        });
    }
    // find the output of the testcase by running the solution code
    const language = "cpp";
    for (let i = 0; i < testCases.length; i += 1) {
        const response = await API.post("/execute", {
            language: language,
            version: language_1.LANGUAGE_VERSIONS[language],
            files: [
                {
                    content: solution,
                },
            ],
            stdin: testCases[i].input,
        });
        // const data = response.data;
        // console.log(data);
        testCases[i].output = response.data.run.output;
    }
    console.log(testCases);
    const newCodingQuestion = new CodingQuestion_1.default({
        title,
        description,
        testCases,
        solution,
    });
    await newCodingQuestion.save();
    console.log(newCodingQuestion);
    return res.status(200).json({
        message: "Coding question created successfully",
        data: newCodingQuestion,
    });
};
exports.createCodingQuestionController = createCodingQuestionController;
const codeSubmitController = async (req, res) => {
    const { language, code, questionId, testid } = req.body;
    console.log(req.body.userId);
    console.log(testid);
    const studenttest_response = await response_1.default.findOne({
        studentId: req.body.userId,
        testId: testid,
    });
    let score = 0;
    if (!language || !code || !questionId) {
        return res.status(400).json({
            message: "Please enter all fields",
        });
    }
    const question = await CodingQuestion_1.default.findById(questionId);
    let totalTestCases = question.testCases.length;
    let testCaseResult = [];
    if (!question) {
        return res.status(404).json({
            message: "Question not found",
        });
    }
    for (let i = 0; i < question.testCases.length; i += 1) {
        const response = await API.post("/execute", {
            language: language,
            version: language_1.LANGUAGE_VERSIONS[language],
            files: [
                {
                    content: code,
                },
            ],
            stdin: question.testCases[i].input,
        });
        const expectedOutput = question.testCases[i].output
            .trim()
            .replace(/\n/g, "");
        const actualOutput = response.data.run.output.trim().replace(/\n/g, "");
        if (actualOutput === expectedOutput) {
            testCaseResult.push({
                input: question.testCases[i].input,
                output: question.testCases[i].output,
                result: "Passed",
            });
            score += 1;
        }
        else {
            testCaseResult.push({
                input: question.testCases[i].input,
                output: question.testCases[i].output,
                result: "Failed",
                expectedOutput: expectedOutput,
                actualOutput: actualOutput,
            });
        }
    }
    const finalScore = (score / totalTestCases) * 10;
    let found = 0;
    for (let i = 0; i < studenttest_response.Coding_responses.length; i++) {
        if (studenttest_response.Coding_responses[i].Coding_question.equals(questionId)) {
            found = 1;
            studenttest_response.Coding_responses[i].CodingQuestion_score = Math.max(studenttest_response.Coding_responses[i].CodingQuestion_score, finalScore);
            break;
        }
    }
    if (found === 0) {
        studenttest_response.Coding_responses.push({
            Coding_question: questionId,
            CodingQuestion_score: finalScore,
        });
    }
    await studenttest_response.save();
    return res.status(200).json({
        message: "Code submitted successfully",
        data: {
            testCaseResult,
        },
    });
};
exports.codeSubmitController = codeSubmitController;
const submitPracticeQuestionController = async (req, res) => {
    const { language, code, questionId } = req.body;
    console.log(req.body.userId);
    let score = 0;
    if (!language || !code || !questionId) {
        return res.status(400).json({
            message: "Please enter all fields",
        });
    }
    const question = await CodingQuestion_1.default.findById(questionId);
    let totalTestCases = question.testCases.length;
    let testCaseResult = [];
    if (!question) {
        return res.status(404).json({
            message: "Question not found",
        });
    }
    for (let i = 0; i < question.testCases.length; i += 1) {
        const response = await API.post("/execute", {
            language: language,
            version: language_1.LANGUAGE_VERSIONS[language],
            files: [
                {
                    content: code,
                },
            ],
            stdin: question.testCases[i].input,
        });
        const expectedOutput = question.testCases[i].output
            .trim()
            .replace(/\n/g, "");
        const actualOutput = response.data.run.output.trim().replace(/\n/g, "");
        if (actualOutput === expectedOutput) {
            testCaseResult.push({
                input: question.testCases[i].input,
                output: question.testCases[i].output,
                result: "Passed",
            });
            score += 1;
        }
        else {
            testCaseResult.push({
                input: question.testCases[i].input,
                output: question.testCases[i].output,
                result: "Failed",
                expectedOutput: expectedOutput,
                actualOutput: actualOutput,
            });
        }
    }
    const practiceQuestion = await PracticeQuestions_1.default.findOne({ CodingQuestionId: questionId, userId: req.body.userId });
    if (practiceQuestion) {
        if (score === totalTestCases) {
            practiceQuestion.practiceStatus = "solved";
            await practiceQuestion.save();
        }
    }
    else {
        const newPracticeQuestion = new PracticeQuestions_1.default({
            CodingQuestionId: questionId,
            userId: req.body.userId,
            practiceStatus: "attempted",
        });
        if (score === totalTestCases) {
            newPracticeQuestion.practiceStatus = "solved";
        }
        await newPracticeQuestion.save();
    }
    return res.status(200).json({
        message: "Code submitted successfully",
        data: {
            testCaseResult,
        },
    });
};
exports.submitPracticeQuestionController = submitPracticeQuestionController;
const getCodingQuestionController = async (req, res) => {
    const { testId } = req.params;
    const codingTest = await codingTest_1.default.findById(testId).populate("Test_questions");
    return res.status(200).json({
        message: "Coding questions fetched successfully",
        data: codingTest.Test_questions,
    });
};
exports.getCodingQuestionController = getCodingQuestionController;
const getSingleCodingQuestionController = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the coding question by its ID
        const codingQuestion = await CodingQuestion_1.default.findById(id);
        if (!codingQuestion) {
            return res.status(404).json({ message: "Coding question not found" });
        }
        // Extract the first three test cases
        const limitedTestCases = codingQuestion.testCases.slice(0, 3);
        // Send the question details along with the first three test cases
        return res.status(200).json({
            title: codingQuestion.title,
            description: codingQuestion.description,
            difficulty: codingQuestion.difficulty,
            tags: codingQuestion.tags,
            solution: codingQuestion.solution,
            testCases: limitedTestCases,
            createdAt: codingQuestion.createdAt,
            variables: codingQuestion.variables,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.getSingleCodingQuestionController = getSingleCodingQuestionController;
const getPracticeQuestionController = async (req, res) => {
    try {
        const codingQuestions = await CodingQuestion_1.default.find({ isPractice: true });
        let codingQuestionsArray = [];
        for (let i = 0; i < codingQuestions.length; i += 1) {
            const practiceData = await PracticeQuestions_1.default.findOne({ CodingQuestionId: codingQuestions[i]._id, userId: req.body.userId });
            codingQuestionsArray.push({
                _id: codingQuestions[i]._id,
                title: codingQuestions[i].title,
                description: codingQuestions[i].description,
                difficulty: codingQuestions[i].difficulty,
                tags: codingQuestions[i].tags,
                solution: codingQuestions[i].solution,
                testCases: codingQuestions[i].testCases,
                createdAt: codingQuestions[i].createdAt,
                variables: codingQuestions[i].variables,
                practiceStatus: practiceData !== null ? practiceData.practiceStatus : "not attempted"
            });
        }
        // console.log(codingQuestions);
        return res.status(200).json({
            data: codingQuestionsArray
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getPracticeQuestionController = getPracticeQuestionController;
const getSinglePracticeQuestionController = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the coding question by its ID
        const codingQuestion = await PracticeQuestions_1.default.findOne({ CodingQuestionId: id, userId: req.body.userId });
        if (!codingQuestion) {
            return res.status(404).json({ message: "Coding question not found" });
        }
        // Extract the first three test cases
        return res.status(200).json({
            _id: codingQuestion.CodingQuestionId,
            practiceStatus: codingQuestion.practiceStatus,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.getSinglePracticeQuestionController = getSinglePracticeQuestionController;
//# sourceMappingURL=CodingQuestionControllers.js.map