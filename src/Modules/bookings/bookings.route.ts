import { Router } from "express";
import { bookingsControler } from "./bookings.controler";

const router = Router()
router.get("/",bookingsControler.getBookings)
router.post("/",bookingsControler.createBooking)
// router.put("/")
// router.delete("/")

export const bookingsRouter = router;