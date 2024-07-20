import { Router } from "express";
import { verifyToken } from "../utils/verifyJWT";
import { generateChatCompletion } from "../controllers/chatControllers";

const chatRouter = Router()

chatRouter.post("/new", verifyToken, generateChatCompletion)

export default chatRouter;
