"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Questionscontroller_1 = require("./../controllers/Questionscontroller");
const express_1 = require("express");
// import createquestion
const Questions = (0, express_1.Router)();
Questions.put("/modifyquestion", Questionscontroller_1.modifyquestion);
Questions.post("/createquestion", Questionscontroller_1.createquestion);
Questions.get("/viewquestion/:id", Questionscontroller_1.viewquestion);
Questions.delete("/deletequestion", Questionscontroller_1.deletequestion);
exports.default = Questions;
//# sourceMappingURL=Questions_routes.js.map