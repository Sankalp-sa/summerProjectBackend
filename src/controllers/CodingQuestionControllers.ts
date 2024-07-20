import { Request, Response } from "express";
import CodingQuestion from "../models/CodingQuestion";

import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants/language";
// import StudentResponse from "../models/response";
import StudentResponse from "../models/response";
import CodingTest from "../models/codingTest";
import PracticeQuestion from "../models/PracticeQuestions";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const createCodingQuestionController = async (
  req: Request,
  res: Response
) => {
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
      version: LANGUAGE_VERSIONS[language],
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

  const newCodingQuestion = new CodingQuestion({
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

export const codeSubmitController = async (req: Request, res: Response) => {
  const { language, code, questionId, testid } = req.body;

  console.log(req.body.userId);
  console.log(testid);

  const studenttest_response = await StudentResponse.findOne({
    studentId: req.body.userId,
    testId: testid,
  });

  let score = 0;

  if (!language || !code || !questionId) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  const question = await CodingQuestion.findById(questionId);

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
      version: LANGUAGE_VERSIONS[language],
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
    } else {
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

  let found: number = 0;

  for (let i = 0; i < studenttest_response.Coding_responses.length; i++) {
    if (
      studenttest_response.Coding_responses[i].Coding_question.equals(
        questionId
      )
    ) {
      found = 1;
      studenttest_response.Coding_responses[i].CodingQuestion_score = Math.max(
        studenttest_response.Coding_responses[i].CodingQuestion_score as number,
        finalScore
      );
      break;
    }
  }

  if(found === 0){
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

export const submitPracticeQuestionController = async (req:Request,res:Response) => {

  const { language, code, questionId } = req.body;

  console.log(req.body.userId);

  let score = 0;

  if (!language || !code || !questionId) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  const question = await CodingQuestion.findById(questionId);

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
      version: LANGUAGE_VERSIONS[language],
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
    } else {
      testCaseResult.push({
        input: question.testCases[i].input,
        output: question.testCases[i].output,
        result: "Failed",
        expectedOutput: expectedOutput,
        actualOutput: actualOutput,
      });
    }
  }

  const practiceQuestion = await PracticeQuestion.findOne({CodingQuestionId: questionId, userId: req.body.userId});

  if(practiceQuestion){

    if(score === totalTestCases){
      practiceQuestion.practiceStatus = "solved";
      await practiceQuestion.save();
    }
    
  }
  else{

    const newPracticeQuestion = new PracticeQuestion({
      CodingQuestionId: questionId,
      userId: req.body.userId,
      practiceStatus: "attempted",
    });

    if(score === totalTestCases){
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

}

export const getCodingQuestionController = async (
  req: Request,
  res: Response
) => {
  const { testId } = req.params;

  const codingTest = await CodingTest.findById(testId).populate(
    "Test_questions"
  );

  return res.status(200).json({
    message: "Coding questions fetched successfully",
    data: codingTest.Test_questions,
  });
};

export const getSingleCodingQuestionController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    // Fetch the coding question by its ID
    const codingQuestion = await CodingQuestion.findById(id);

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
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getPracticeQuestionController = async (req:Request,res:Response) => {

  try{
      const codingQuestions: any = await CodingQuestion.find({isPractice:true});

      let codingQuestionsArray = [];

      for(let i = 0; i < codingQuestions.length; i += 1){
        
        const practiceData = await PracticeQuestion.findOne({CodingQuestionId: codingQuestions[i]._id, userId: req.body.userId});

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
          data : codingQuestionsArray
      })
  }
  catch(error){
      console.log(error);
  }

}

export const getSinglePracticeQuestionController = async (req:Request,res:Response) => {

  const { id } = req.params;

  try {
    // Fetch the coding question by its ID
    const codingQuestion = await PracticeQuestion.findOne({CodingQuestionId: id, userId: req.body.userId});

    if (!codingQuestion) {
      return res.status(404).json({ message: "Coding question not found" });
    }

    // Extract the first three test cases

    return res.status(200).json({
      _id: codingQuestion.CodingQuestionId,
      practiceStatus: codingQuestion.practiceStatus,
    });

}