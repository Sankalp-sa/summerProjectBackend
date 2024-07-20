import { Response, Request, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.signedCookies["auth_token"];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const data = await jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = data.id

    console.log(req.body)

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
