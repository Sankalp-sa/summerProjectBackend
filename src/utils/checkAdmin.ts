import { NextFunction, Request, Response } from "express"
import { User } from "../models/User"


export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {

    try {

        console.log(req.body.userId)

        const user = await User.findById(req.body.userId)

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        
        if (user.role !== "Admin") {
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        console.log(user)

        next();
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}