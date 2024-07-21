"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CodeControllers_1 = require("../controllers/CodeControllers");
const codeRouter = (0, express_1.Router)();
codeRouter.post("/runcode/:language", CodeControllers_1.runCodeController);
exports.default = codeRouter;
//# sourceMappingURL=codeRoutes.js.map