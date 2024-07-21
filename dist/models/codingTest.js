"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const codingtestSchema = new Schema({
    Test_name: {
        type: String,
        require: true
    },
    Test_questions: [{
            type: Schema.Types.ObjectId,
            ref: 'CodingQuestion'
        }]
});
const CodingTest = mongoose_1.default.model('CodingTest', codingtestSchema);
exports.default = CodingTest;
//# sourceMappingURL=codingTest.js.map