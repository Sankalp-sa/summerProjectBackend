"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { createCodingTest , deleteCodingTest} from "../controllers/codingQuestionController";
const CodingTestController_1 = require("../controllers/CodingTestController");
const Codingtestrouter = (0, express_1.Router)();
Codingtestrouter.post("/createCodingtest", CodingTestController_1.createCodingTest);
Codingtestrouter.delete("/deletecodingtest", CodingTestController_1.deleteCodingTest);
Codingtestrouter.get("/getcodingtest", CodingTestController_1.getcodingtest);
exports.default = Codingtestrouter;
//# sourceMappingURL=Codingtestroutes.js.map