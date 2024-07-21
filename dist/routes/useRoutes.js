"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_js_1 = require("../controllers/userControllers.js");
const validators_js_1 = require("../utils/validators.js");
const userRouter = (0, express_1.Router)();
userRouter.get("/", userControllers_js_1.getAllUsers);
userRouter.post("/signup", (0, validators_js_1.validate)(validators_js_1.signUpValidator), userControllers_js_1.userSignUp);
userRouter.post("/login", (0, validators_js_1.validate)(validators_js_1.loginValidator), userControllers_js_1.userLogin);
exports.default = userRouter;
//# sourceMappingURL=useRoutes.js.map