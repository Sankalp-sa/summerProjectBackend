import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {
            
        for (let validation of validations){
            const result = await validation.run(req);

            if(!result.isEmpty()){
                break;
            }
        }

        const errors = validationResult(req);

        if(errors.isEmpty()){
            return next();
        } 
    
        return res.status(422).json({ errors: errors.array() });
    }

}

export const signUpValidator = [
  body("name")
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .trim()
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];