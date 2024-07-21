"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const verifyJWT_1 = require("../utils/verifyJWT");
const applicationControllers_1 = require("../controllers/applicationControllers");
const fs_1 = __importDefault(require("fs"));
const checkAdmin_1 = require("../utils/checkAdmin");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const path = `./public/uploads/${req.body.user_id}`;
        fs_1.default.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (!file) {
    }
    else {
        cb(null, true);
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter
});
const applicationRouter = (0, express_1.Router)();
// applicationRouter.use(verifyToken)
applicationRouter.post("/send", verifyJWT_1.verifyToken, upload.fields([{ name: "id_proof" }, { name: "photo" }]), applicationControllers_1.sendApplication);
applicationRouter.get("/getApplication/:id", verifyJWT_1.verifyToken, applicationControllers_1.getApplication);
applicationRouter.put("/updateApplication/:id", verifyJWT_1.verifyToken, upload.fields([{ name: "id_proof" }, { name: "photo" }]), applicationControllers_1.updateApplication);
// Admin routes for application processing
applicationRouter.get("/getApplications", verifyJWT_1.verifyToken, checkAdmin_1.isAdmin, applicationControllers_1.getAllApplications);
exports.default = applicationRouter;
//# sourceMappingURL=applicationRoutes.js.map