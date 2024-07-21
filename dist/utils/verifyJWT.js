"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = async (req, res, next) => {
    try {
        const token = req.signedCookies["auth_token"];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const data = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.userId = data.id;
        console.log(req.body);
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyJWT.js.map