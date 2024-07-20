import { Router } from 'express';
import { runCodeController } from '../controllers/CodeControllers';

const codeRouter = Router()

codeRouter.post("/runcode/:language", runCodeController);


export default codeRouter  