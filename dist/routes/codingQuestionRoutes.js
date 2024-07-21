"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CodingQuestionControllers_1 = require("../controllers/CodingQuestionControllers");
const verifyJWT_1 = require("../utils/verifyJWT");
const codingQuestionRouter = (0, express_1.Router)();
codingQuestionRouter.post("/create", CodingQuestionControllers_1.createCodingQuestionController);
codingQuestionRouter.post("/submit", verifyJWT_1.verifyToken, CodingQuestionControllers_1.codeSubmitController);
codingQuestionRouter.get("/get/:testId", CodingQuestionControllers_1.getCodingQuestionController);
codingQuestionRouter.get("/getQuestion/:id", verifyJWT_1.verifyToken, CodingQuestionControllers_1.getSingleCodingQuestionController);
codingQuestionRouter.get("/getPracticeQuestions", verifyJWT_1.verifyToken, CodingQuestionControllers_1.getPracticeQuestionController);
codingQuestionRouter.post("/submitPractice", verifyJWT_1.verifyToken, CodingQuestionControllers_1.submitPracticeQuestionController);
codingQuestionRouter.get("/getPracticeQuestion/:id", verifyJWT_1.verifyToken, CodingQuestionControllers_1.getSinglePracticeQuestionController);
exports.default = codingQuestionRouter;
//# sourceMappingURL=codingQuestionRoutes.js.map