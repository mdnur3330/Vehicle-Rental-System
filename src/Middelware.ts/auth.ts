import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../Config";

export const auth = ()=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "You Aru Not Allowed"
            })
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,config.secret as string) as JwtPayload;
        req.user = decoded;
        next();
    }
    
}