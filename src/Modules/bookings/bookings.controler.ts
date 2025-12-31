import { Request, Response } from "express"
import { bookingsServes } from "./bookings.serves"


const getBookings = async(req:Request,res:Response)=>{
    try{
    const result = await bookingsServes.getBookings()
    res.status(200).json({
        success: true,
        message: result.rows
    })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const createBooking = async (req:Request,res:Response)=>{
    console.log("controler asece",req.body);
    try{
        const result = await bookingsServes.createBooking(req.body)
        res.status(201).json({
            success: true,
            message: "Booked Vehicle",
            result : result.rows
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// const updateBooking =  async (req:Request,res:Response)=>{
//     try{
//         const result = await bookingsServes.updateBooking(req.body)
//         res.status(201).json({
//             success: true,
//             message: "Updated Booking",
//             result : result.rows
//         })
//     }catch(err:any){
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

export const bookingsControler ={
    getBookings,
    createBooking
}