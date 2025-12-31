import { Request, Response } from "express";
import { vehicleServes } from "./vehicle.serves";
import { JwtPayload } from "jsonwebtoken";

const getVehicles = async (req:Request,res:Response)=>{
    try{
        const result = await vehicleServes.getVehicle()
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            details: result.rows
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const getSingleVehicles = async (req:Request,res:Response)=>{
    const id = Number(req.params.id)
    try{
        const result = await vehicleServes.getSingleVehicles(id)
        if(result.rowCount === 0){
            return res.status(200).json({
                success:true,
                message: "No vehicles found",
                data:[]
            })
        }
        return res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const createVehicles = async (req:Request,res:Response)=>{
    try{
        if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
        const {role}=req.user as JwtPayload;
        if(role === 'admin'){
            const result = await vehicleServes.createVehicles(req.body)
        return res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows,
        })
        }
        return res.status(403).json({
            success: false,
            message: "only admin can create"
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const updateVehicles = async (req:Request,res:Response)=>{
    const id = Number(req.params.id)
    try{
        if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
        const {role} = req.user as JwtPayload;
        if(role === 'admin'){
            const result = await vehicleServes.updateVehicles(req.body,id)
        return res.status(200).json({
            success: true,
            message: 'Successfully Updated',
            details: result.rows,
        })
        }
        return res.status(403).json({
                success: false,
                message: 'Only Admin Can Update'
            })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const deleteVehicles = async (req:Request,res:Response)=>{
    const id = Number(req.params.id)
    try{
        if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
        const {role} = req.user as JwtPayload;
        if(role === 'admin'){
            await vehicleServes.deleteVehicles(id)
        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        })
        }
        return res.status(403).json({
            success: false,
            message: "only admin can delete"
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const vehicleControler = {
    getVehicles,
    createVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles
}