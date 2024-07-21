"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signUpValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
exports.validate = validate;
exports.signUpValidator = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage("Name must be at least 3 characters"),
    (0, express_validator_1.body)("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
exports.loginValidator = [
    (0, express_validator_1.body)("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
//# sourceMappingURL=validators.js.map