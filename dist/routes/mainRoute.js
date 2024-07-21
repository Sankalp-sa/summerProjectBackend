"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_js_1 = __importDefault(require("./userRoutes.js"));
const chatRoutes_js_1 = __importDefault(require("./chatRoutes.js"));
const applicationRoutes_js_1 = __importDefault(require("./applicationRoutes.js"));
// import Question from '../models/Question.js';
const Questions_routes_js_1 = __importDefault(require("./Questions_routes.js"));
const Testroutes_js_1 = __importDefault(require("./Testroutes.js"));
const notificationRoutes_js_1 = __importDefault(require("./notificationRoutes.js"));
const codeRoutes_js_1 = __importDefault(require("./codeRoutes.js"));
const codingQuestionRoutes_js_1 = __importDefault(require("./codingQuestionRoutes.js"));
// import codingTest from './codingQuestionRoutes.js';
const Codingtestroutes_js_1 = __importDefault(require("./Codingtestroutes.js"));
const router = (0, express_1.Router)();
router.use("/user", userRoutes_js_1.default);
router.use("/chat", chatRoutes_js_1.default);
router.use("/application", applicationRoutes_js_1.default);
router.use("/question", Questions_routes_js_1.default);
router.use("/test", Testroutes_js_1.default);
router.use("/notification", notificationRoutes_js_1.default);
router.use("/code", codeRoutes_js_1.default);
router.use("/codingQuestion", codingQuestionRoutes_js_1.default);
router.use("/codingTest", Codingtestroutes_js_1.default);
exports.default = router;
//# sourceMappingURL=mainRoute.js.map