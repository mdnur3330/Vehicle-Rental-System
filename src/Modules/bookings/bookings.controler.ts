import { Request, Response } from "express"
import { bookingsServes } from "./bookings.serves"
import { JwtPayload } from "jsonwebtoken";


const getBookings = async(req:Request,res:Response)=>{
    try{
        if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const {role, id} = req.user as JwtPayload;
    if(role === 'admin'){
        const result = await bookingsServes.getBookings()
        return res.status(200).json({
        success: true,
        message: result.rows
    })
    }
   if(role === 'customer'){
        const result = await bookingsServes.getSingleBookings(id)
        res.status(200).json({
        success: true,
        message: result.rows
    })
    }
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

const updateBooking = async (req: Request, res: Response) => {
  const bookingId = Number(req.params.id);

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { id: userId, role } = req.user as JwtPayload;

  try {
    let result;
    if (role === "customer") {
      result = await bookingsServes.cancelBookingByCustomer(
        bookingId,
        userId
      );
    } else if (role === "admin") {
      result = await bookingsServes.returnBookingByAdmin(bookingId);
    } else {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    if (err.message === "BOOKING_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (err.message === "FORBIDDEN") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    if (err.message === "RENT_ALREADY_STARTED") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel booking after rent start date",
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const bookingsControler ={
    getBookings,
    createBooking,
    updateBooking   
    }