"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationControllers_1 = require("../controllers/notificationControllers");
const verifyJWT_1 = require("../utils/verifyJWT");
const checkAdmin_1 = require("../utils/checkAdmin");
const notificationRouter = (0, express_1.Router)();
notificationRouter.get('/getNotifications', notificationControllers_1.getAllNotifications);
notificationRouter.post('/createNotification', verifyJWT_1.verifyToken, checkAdmin_1.isAdmin, notificationControllers_1.createNotification);
notificationRouter.put('/updateNotification', notificationControllers_1.updateNotification);
notificationRouter.delete('/deleteNotification', notificationControllers_1.deleteNotification);
notificationRouter.post("/sendNotification", verifyJWT_1.verifyToken, checkAdmin_1.isAdmin, notificationControllers_1.sendNotification);
notificationRouter.post("/sendTest", verifyJWT_1.verifyToken, checkAdmin_1.isAdmin, notificationControllers_1.sendTest);
notificationRouter.post("/pending_noti", notificationControllers_1.pending_appli_noti);
exports.default = notificationRouter;
//# sourceMappingURL=notificationRoutes.js.map