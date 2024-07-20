import { Router } from 'express';
import { codeSubmitController, createCodingQuestionController, getCodingQuestionController, getPracticeQuestionController, getSingleCodingQuestionController, getSinglePracticeQuestionController, submitPracticeQuestionController } from '../controllers/CodingQuestionControllers';
import { verifyToken } from '../utils/verifyJWT';

const codingQuestionRouter = Router();

codingQuestionRouter.post("/create", createCodingQuestionController);
codingQuestionRouter.post("/submit", verifyToken, codeSubmitController);
codingQuestionRouter.get("/get/:testId", getCodingQuestionController);
codingQuestionRouter.get("/getQuestion/:id", verifyToken, getSingleCodingQuestionController)
codingQuestionRouter.get("/getPracticeQuestions", verifyToken, getPracticeQuestionController);
codingQuestionRouter.post("/submitPractice", verifyToken, submitPracticeQuestionController);
codingQuestionRouter.get("/getPracticeQuestion/:id", verifyToken, getSinglePracticeQuestionController);

export default codingQuestionRouter;