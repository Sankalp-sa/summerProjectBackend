"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pending_appli_noti = exports.sendTest = exports.sendNotification = exports.deleteNotification = exports.updateNotification = exports.createNotification = exports.getAllNotifications = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
const index_1 = require("../index");
const Application_1 = __importDefault(require("../models/Application"));
const response_1 = __importDefault(require("../models/response"));
const getAllNotifications = async (req, res) => {
    const notifications = await Notification_1.default.find();
    res.status(200).json({
        notifications,
    });
};
exports.getAllNotifications = getAllNotifications;
const createNotification = async (req, res) => {
    const { status, message, recipient } = req.body;
    console.log(req.body);
    const notification = new Notification_1.default({
        status,
        message,
        recipient,
    });
    await notification.save();
    res.status(201).json({
        notification,
        message: "Notification created successfully",
    });
};
exports.createNotification = createNotification;
const updateNotification = async (req, res) => {
    const { id, status, message, recipient } = req.body;
    const notification = await Notification_1.default.findByIdAndUpdate(id, {
        status,
        message,
        recipient,
    });
    res.status(200).json({
        notification,
        message: "Notification updated successfully",
    });
};
exports.updateNotification = updateNotification;
const deleteNotification = async (req, res) => {
    const { id } = req.body;
    const notification = await Notification_1.default.findByIdAndDelete(id);
    res.status(200).json({
        notification,
        message: "Notification deleted successfully",
    });
};
exports.deleteNotification = deleteNotification;
const sendNotification = async (req, res) => {
    const { userId, message } = req.body;
    index_1.io.to(userId).emit("receiveNotification", message);
    res.status(200).send("Notification sent");
};
exports.sendNotification = sendNotification;
const sendTest = async (req, res) => {
    const { userArray, testId } = req.body;
    console.log(userArray);
    for (let i = 0; i < userArray.length; i++) {
        // check if the Student Response already exists
        const response = await response_1.default.findOne({
            studentId: userArray[i],
            testId,
        });
        if (response) {
            continue;
        }
        const newResponse = new response_1.default({
            studentId: userArray[i],
            testId,
        });
        await newResponse.save();
        index_1.io.to(userArray[i]).emit("receiveNotification", "You have a new test available");
    }
    res.status(200).send({
        message: "Test sent",
    });
};
exports.sendTest = sendTest;
const pending_appli_noti = async (req, res) => {
    const { id } = req.body;
    try {
        const findid = await Application_1.default.findOne({ Student_id: id });
        console.log(findid);
        if (!findid) {
            index_1.io.to(id).emit("Pending_application_Notification", "Your application is remaining, please fill it");
        }
        // Send the response only once after the above operations
        res.status(200).json({
            message: "Send Notification successfully",
        });
    }
    catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
        else {
            console.error("Error after response sent:", error);
        }
    }
};
exports.pending_appli_noti = pending_appli_noti;
//# sourceMappingURL=notificationControllers.js.map