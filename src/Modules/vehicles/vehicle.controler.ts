import { Request, Response } from "express";
import { vehicleServes } from "./vehicle.serves";

const getVehicles = async (req:Request,res:Response)=>{
    try{
        const result = await vehicleServes.getVehicle()
        res.status(200).json({
            success: true,
            messatge: "Successfully Gotten All Vehicles",
            details: result.rows
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.any
        })
    }
}
const getSingleVehicles = async (req:Request,res:Response)=>{
    const id = Number(req.params.id)
    try{
        const result = await vehicleServes.getSingleVehicles(id)
        res.status(200).json({
            success: true,
            messatge: "Successfully Gotten Vehicles",
            details: result.rows
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.any
        })
    }
}

const createVehicles = async (req:Request,res:Response)=>{
    console.log(req.body);
    try{
        const result = await vehicleServes.createVehicles(req.body)
        res.status(201).json({
            success: true,
            message: result.rows,
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.any
        })
    }
}

const updateVehicles = async (req:Request,res:Response)=>{
    const id = Number(req.params.id)
    try{
        const result = await vehicleServes.updateVehicles(req.body,id)
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.any
        })
    }
}
const deleteVehicles = async (req:Request,res:Response)=>{
    const id = Number(req.params.id)
    try{
        const result = await vehicleServes.deleteVehicles(id)
        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
            detatils: result.rows,
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.any
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