import { Router } from "express";
import { bookingsControler } from "./bookings.controler";
import { auth } from "../../Middelware.ts/auth";

const router = Router()
router.get("/",auth(), bookingsControler.getBookings)
router.post("/",bookingsControler.createBooking)
router.put("/:id",auth(),bookingsControler.updateBooking)

export const bookingsRouter = router;