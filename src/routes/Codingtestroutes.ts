import { Router } from "express";
// import { createCodingTest , deleteCodingTest} from "../controllers/codingQuestionController";
import { getcodingtest, createCodingTest, deleteCodingTest } from "../controllers/CodingTestController";

const Codingtestrouter = Router();

Codingtestrouter.post("/createCodingtest",createCodingTest);
Codingtestrouter.delete("/deletecodingtest",deleteCodingTest);
Codingtestrouter.get("/getcodingtest", getcodingtest);
export default Codingtestrouter;