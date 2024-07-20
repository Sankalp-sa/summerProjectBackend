import { createquestion , modifyquestion , viewquestion , deletequestion} from './../controllers/Questionscontroller';
import { Router } from "express";
// import createquestion

const Questions = Router();

Questions.put("/modifyquestion",modifyquestion)

Questions.post("/createquestion",createquestion)

Questions.get("/viewquestion/:id",viewquestion)

Questions.delete("/deletequestion",deletequestion)


export default Questions