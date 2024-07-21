"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const User_1 = require("../models/User");
const isAdmin = async (req, res, next) => {
    try {
        console.log(req.body.userId);
        const user = await User_1.User.findById(req.body.userId);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        if (user.role !== "Admin") {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        console.log(user);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=checkAdmin.js.map