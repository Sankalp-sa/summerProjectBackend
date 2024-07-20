import { Router } from "express";
import { checkAdmin, checkUser, getAllUsers, userLogin, userLogout, userSignUp } from "../controllers/userControllers.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/verifyJWT.js";

const userRouter = Router()

userRouter.get("/",getAllUsers)

userRouter.post("/signup", validate(signUpValidator),userSignUp)

userRouter.post("/login", validate(loginValidator), userLogin)

userRouter.get("/auth-check", verifyToken, checkUser)

userRouter.get("/auth-admin-check", verifyToken, checkAdmin)

userRouter.get("/logout", userLogout)

export default userRouter;

