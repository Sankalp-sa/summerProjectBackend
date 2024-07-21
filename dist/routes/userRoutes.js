"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_js_1 = require("../controllers/userControllers.js");
const validators_js_1 = require("../utils/validators.js");
const verifyJWT_js_1 = require("../utils/verifyJWT.js");
const userRouter = (0, express_1.Router)();
userRouter.get("/", userControllers_js_1.getAllUsers);
userRouter.post("/signup", (0, validators_js_1.validate)(validators_js_1.signUpValidator), userControllers_js_1.userSignUp);
userRouter.post("/login", (0, validators_js_1.validate)(validators_js_1.loginValidator), userControllers_js_1.userLogin);
userRouter.get("/auth-check", verifyJWT_js_1.verifyToken, userControllers_js_1.checkUser);
userRouter.get("/auth-admin-check", verifyJWT_js_1.verifyToken, userControllers_js_1.checkAdmin);
userRouter.get("/logout", userControllers_js_1.userLogout);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map