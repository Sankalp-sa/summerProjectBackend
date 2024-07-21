"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCodeController = void 0;
const language_1 = require("./../constants/language");
const axios_1 = __importDefault(require("axios"));
const API = axios_1.default.create({
    baseURL: "https://emkc.org/api/v2/piston",
});
const runCodeController = async (req, res) => {
    const { language } = req.params;
    const response = await API.post("/execute", {
        language: language,
        version: language_1.LANGUAGE_VERSIONS[language],
        files: [
            {
                content: req.body.code,
            },
        ],
        stdin: req.body.input,
    });
    console.log(response.data);
    res.json(response.data);
};
exports.runCodeController = runCodeController;
//# sourceMappingURL=CodeControllers.js.map