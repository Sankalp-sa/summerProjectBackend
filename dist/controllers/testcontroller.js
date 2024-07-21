"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleResponse = exports.getSampleTest = exports.getTestWithResponse = exports.getResponse = exports.startTest = exports.sorted_student = exports.getUserTests = exports.calculatescore = exports.updatetest = exports.deletetest = exports.getSingleTest = exports.getTests = exports.createtest = void 0;
// import Test/ from "../models/Test"
const Test_1 = __importDefault(require("../models/Test"));
const Question_1 = __importDefault(require("../models/Question"));
const response_1 = __importDefault(require("../models/response"));
const index_1 = require("../index");
const User_1 = require("../models/User");
const createtest = async (req, res, next) => {
    try {
        const { start_time, end_time, name, duration, Codingtest } = req.body;
        const new_test = new Test_1.default({
            test_name: name,
            start_time,
            end_time,
            duration,
            Codingtest,
        });
        await new_test.save();
        res.status(200).json({
            message: "Test created successfully",
            data: new_test,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createtest = createtest;
const getTests = async (req, res) => {
    try {
        const tests = await Test_1.default.find();
        res.status(200).json({
            message: "All tests",
            data: tests,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getTests = getTests;
// get single test using test id
const getSingleTest = async (req, res) => {
    try {
        let test = await Test_1.default.findById(req.params.id);
        let Questions = [];
        for (let i = 0; i < test.questionArray.length; i += 1) {
            const question = await Question_1.default.findById(test.questionArray[i]);
            Questions.push(question);
        }
        return res.status(200).json({
            message: "Test",
            data: { test, Questions },
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getSingleTest = getSingleTest;
const deletetest = async (req, res) => {
    try {
        const { id } = req.body;
        const deleted = await Test_1.default.findByIdAndDelete(id);
        // also delete the response of users who have given the test
        await response_1.default.deleteMany({ testId: id });
        return res.status(200).json({ message: "Deleted Test successfully" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deletetest = deletetest;
const updatetest = async (req, res) => {
    try {
        const { id, start_time, end_time, name, questionArray } = req.body;
        console.log(req.body);
        const updated = await Test_1.default.findByIdAndUpdate(id, {
            start_time,
            end_time,
            test_name: name,
        });
        console.log(updated);
        // update the questions in the test
        for (let i = 0; i < questionArray.length; i++) {
            await Question_1.default.findByIdAndUpdate(questionArray[i]._id, {
                question: questionArray[i].question,
                option1: questionArray[i].option1,
                option2: questionArray[i].option2,
                option3: questionArray[i].option3,
                option4: questionArray[i].option4,
                correctoption: questionArray[i].correctoption,
            });
        }
        // update the score of the students who had given the test
        const students = await response_1.default.find({ testId: id, given: true });
        console.log(students);
        for (let i = 0; i < students.length; i++) {
            let marks = 0;
            for (let j = 0; j < questionArray.length; j++) {
                const i_d = await Question_1.default.findById(questionArray[j]._id);
                if (students[i].responses[j]?.answer != -1 &&
                    students[i].responses[j]?.answer != 0 &&
                    students[i].responses[j]?.answer != undefined &&
                    students[i].responses[j]?.answer != null) {
                    if (students[i].responses[j].answer == i_d.correctoption) {
                        marks += 1;
                    }
                    else {
                        marks -= 1;
                    }
                }
            }
            console.log(marks);
            students[i].score = marks;
            await students[i].save();
        }
        return res
            .status(200)
            .json({ ok: true, message: "Updated test successfully" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updatetest = updatetest;
const calculatescore = async (req, res, next) => {
    try {
        const { student, testid, question_array } = req.body;
        let marks = 0;
        for (let i = 0; i < question_array.length; i++) {
            const i_d = await Question_1.default.findById(question_array[i].questionId);
            if (question_array[i].answer != -1 &&
                question_array[i].answer != 0 &&
                question_array[i].answer != undefined &&
                question_array[i].answer != null) {
                if (question_array[i].answer == i_d.correctoption) {
                    marks += 1;
                }
                else {
                    marks -= 1;
                }
            }
        }
        console.log(student, testid, question_array);
        const existingResponse = await response_1.default.findOne({
            testId: testid,
            studentId: student,
        });
        // Add the codingScore from teh existing response
        for (let i = 0; i < existingResponse.Coding_responses.length; i++) {
            marks += existingResponse.Coding_responses[i]
                .CodingQuestion_score;
        }
        if (existingResponse) {
            existingResponse.score = marks;
            existingResponse.responses = question_array;
            existingResponse.given = true;
            existingResponse.isStarted = false;
            await existingResponse.save();
        }
        else {
            const newResponse = new response_1.default({
                testId: testid,
                studentId: student,
                score: marks,
                responses: question_array,
                given: true,
                isStarted: false,
            });
            await newResponse.save();
        }
        return res.status(200).json({
            message: "Score calculated successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while calculating the score",
        });
    }
};
exports.calculatescore = calculatescore;
const getUserTests = async (req, res) => {
    try {
        const { id } = req.params;
        const tests = await response_1.default.find({ studentId: id });
        let finalTests = [];
        for (let i = 0; i < tests.length; i++) {
            const currTest = await Test_1.default.findById(tests[i].testId);
            if (currTest.sampleTest === false) {
                finalTests.push({
                    response: tests[i],
                    test: currTest,
                });
            }
        }
        return res.status(200).json({
            message: "User tests",
            data: finalTests,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserTests = getUserTests;
const sorted_student = async (req, res) => {
    try {
        const id = await response_1.default.find({ given: 1 })
            .sort({ score: -1 })
            .limit(1);
        for (let i = 0; i < id.length; i++) {
            index_1.io.to(id[i]._id).emit("Sotlisting_message", "Dear student , you are sortlisted , please confirm your seat");
        }
        return res.status(200).json({
            message: id,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.sorted_student = sorted_student;
const startTest = async (req, res) => {
    try {
        const { testId, studentId, startTime } = req.body;
        const findResponse = await response_1.default.findOne({ testId, studentId });
        if (findResponse) {
            findResponse.isStarted = true;
            findResponse.startTime = startTime;
            await findResponse.save();
        }
        else {
            const newResponse = new response_1.default({
                testId,
                studentId,
                isStarted: true,
                startTime: startTime,
            });
            await newResponse.save();
        }
        return res.status(200).json({
            message: "Test started successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while starting the test",
        });
    }
};
exports.startTest = startTest;
// get response of a student
const getResponse = async (req, res) => {
    try {
        const { studentId, testId } = req.query;
        const response = await response_1.default.find({ studentId, testId });
        return res.status(200).json({
            message: "Student response",
            data: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching the response",
        });
    }
};
exports.getResponse = getResponse;
const getTestWithResponse = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Test id here ", id);
        const test = await response_1.default.find({ testId: id }).sort({
            score: -1,
        });
        let testData = [];
        for (let i = 0; i < test.length; i++) {
            const currTest = await Test_1.default.findById(test[i].testId);
            const student = await User_1.User.findById(test[i].studentId);
            testData.push({
                response: test[i],
                test: currTest,
                student,
            });
        }
        return res.status(200).json({
            message: "Test with response",
            data: testData,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching the test with response",
        });
    }
};
exports.getTestWithResponse = getTestWithResponse;
// get Sample test
const getSampleTest = async (req, res) => {
    try {
        const { id } = req.params;
        const sampleTests = await Test_1.default.find({ sampleTest: true });
        // console.log("sample test")
        // console.log(sampleTests)
        for (let i = 0; i < sampleTests.length; i++) {
            const existingResponse = await response_1.default.findOne({
                studentId: id,
                testId: sampleTests[i]._id,
            });
            if (!existingResponse) {
                const newResponse = new response_1.default({
                    studentId: id,
                    testId: sampleTests[i]._id,
                });
                await newResponse.save();
            }
        }
        const tests = await response_1.default.find({ studentId: id });
        let finalTests = [];
        for (let i = 0; i < tests.length; i++) {
            const currTest = await Test_1.default.findById(tests[i].testId);
            if (currTest.sampleTest === true) {
                finalTests.push({
                    response: tests[i],
                    test: currTest,
                });
            }
        }
        return res.status(200).json({
            message: "User tests",
            data: finalTests,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getSampleTest = getSampleTest;
const getSingleResponse = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await response_1.default.findOne({ testId: id, studentId: req.body.userId }).populate("testId");
        return res.status(200).json({
            message: "Response",
            data: response
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getSingleResponse = getSingleResponse;
//# sourceMappingURL=testcontroller.js.map