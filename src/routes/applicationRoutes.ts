import { userLogin } from './../controllers/userControllers';
import { Router, Request } from 'express';
import multer from 'multer'
import { verifyToken } from '../utils/verifyJWT';
import { getAllApplications, getApplication, sendApplication, updateApplication } from '../controllers/applicationControllers';
import fs from 'fs'
import { isAdmin } from '../utils/checkAdmin';

const storage = multer.diskStorage({

    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        const path = `./public/uploads/${req.body.user_id}`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if (!file) {
    } else {
        cb(null, true);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});


const applicationRouter = Router()

// applicationRouter.use(verifyToken)

applicationRouter.post("/send", verifyToken, upload.fields([{name: "id_proof"}, {name: "photo"}]), sendApplication)

applicationRouter.get("/getApplication/:id", verifyToken, getApplication)

applicationRouter.put("/updateApplication/:id", verifyToken, upload.fields([{name: "id_proof"}, {name: "photo"}]), updateApplication)

// Admin routes for application processing

applicationRouter.get("/getApplications", verifyToken, isAdmin, getAllApplications)

export default applicationRouter