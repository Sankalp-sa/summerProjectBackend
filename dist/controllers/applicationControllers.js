"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllApplications = exports.updateApplication = exports.getApplication = exports.sendApplication = void 0;
const Application_1 = __importDefault(require("../models/Application"));
const User_1 = require("../models/User");
const sendApplication = async (req, res, next) => {
    try {
        console.log(req.body);
        const { ssc_percentage, hsc_percentage, jee_percentile, gujcet_percentile, user_id, } = req.body;
        if (!ssc_percentage ||
            !hsc_percentage ||
            !jee_percentile ||
            !gujcet_percentile) {
            return res.status(400).json({
                message: "Please provide all the details",
            });
        }
        const id_proof = req.files["id_proof"][0].filename;
        const photo = req.files["photo"][0].filename;
        //write the code to Save the application to the database
        const newApplication = new Application_1.default({
            Student_id: user_id,
            ssc_percentage,
            hsc_percentage,
            jee_percentile,
            gujcet_percentile,
            id_proof,
            photo,
        });
        await newApplication.save();
        return res.status(200).json({
            message: "Application sent successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.sendApplication = sendApplication;
// get Application of a specific applicant
const getApplication = async (req, res, next) => {
    try {
        const application = await Application_1.default.findOne({
            Student_id: req.params.id,
        });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }
        return res.status(200).json({
            ok: true,
            application,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.getApplication = getApplication;
// update Application of a specific applicant
const updateApplication = async (req, res, next) => {
    try {
        const { ssc_percentage, hsc_percentage, jee_percentile, gujcet_percentile, } = req.body;
        if (!ssc_percentage ||
            !hsc_percentage ||
            !jee_percentile ||
            !gujcet_percentile) {
            return res.status(400).json({
                message: "Please provide all the details",
            });
        }
        let id_proof = "";
        let photo = "";
        if (req.files["id_proof"]) {
            id_proof = req.files["id_proof"][0].filename;
        }
        if (req.files["photo"]) {
            photo = req.files["photo"][0].filename;
        }
        //write the code to update the application to the database
        if (id_proof.length > 0 && photo.length > 0) {
            await Application_1.default.findByIdAndUpdate(req.params.id, {
                ssc_percentage,
                hsc_percentage,
                jee_percentile,
                gujcet_percentile,
                id_proof,
                photo,
            });
        }
        if (id_proof.length > 0) {
            await Application_1.default.findByIdAndUpdate(req.params.id, {
                ssc_percentage,
                hsc_percentage,
                jee_percentile,
                gujcet_percentile,
                id_proof,
            });
        }
        if (photo.length > 0) {
            await Application_1.default.findByIdAndUpdate(req.params.id, {
                ssc_percentage,
                hsc_percentage,
                jee_percentile,
                gujcet_percentile,
                photo,
            });
        }
        return res.status(200).json({
            message: "Application updated successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.updateApplication = updateApplication;
// get all Applications
const getAllApplications = async (req, res, next) => {
    try {
        const applications = await Application_1.default.find();
        const studentDetails = [];
        for (let i = 0; i < applications.length; i++) {
            const user = await User_1.User.findById(applications[i].Student_id);
            studentDetails.push({
                student: user,
                application: applications[i],
            });
        }
        return res.status(200).json({
            ok: true,
            applications: studentDetails,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.getAllApplications = getAllApplications;
//# sourceMappingURL=applicationControllers.js.map