import express from "express";
import { userRouter } from "./Modules/user/user.route";
import { intDB } from "./Config/db";
import { authRouter } from "./Modules/auth/auth.route";
import { vehicleRouter } from "./Modules/vehicles/vehicle.router";
import { bookingsRouter } from "./Modules/bookings/bookings.route";

export const app = express();
intDB()
app.use(express.json())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/vehicles",vehicleRouter);
app.use("/api/v1/bookings",bookingsRouter);

