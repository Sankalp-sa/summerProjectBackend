"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id, email) => {
    const data = { id, email };
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
exports.createToken = createToken;
//# sourceMappingURL=tokenUtils.js.map