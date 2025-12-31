import { Request, Response } from "express";
import { authServes } from "./auth.serves";

const createUser = async (req:Request,res:Response)=>{
    try{
        
        const result = await authServes.signUpIntoDB(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const loginUser = async (req:Request,res:Response)=>{

    const {email,password} = req.body;
    console.log("paice",email,password);
    try{
        const result = await authServes.logInIntoDB(email,password)
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const authControler = {
    createUser,
    loginUser
}