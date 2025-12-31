import { Router } from "express";
import { vehicleControler } from "./vehicle.controler";
import { auth } from "../../Middelware.ts/auth";

const router = Router()
router.get("/", vehicleControler.getVehicles);
router.get("/:id",vehicleControler.getSingleVehicles);
router.post("/",auth(), vehicleControler.createVehicles);
router.put("/:id",auth(), vehicleControler.updateVehicles);
router.delete("/:id", auth(), vehicleControler.deleteVehicles);



export const vehicleRouter = router;