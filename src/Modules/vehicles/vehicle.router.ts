import { Router } from "express";
import { vehicleControler } from "./vehicle.controler";

const router = Router()
router.get("/", vehicleControler.getVehicles);
router.get("/:id",vehicleControler.getSingleVehicles)
router.post("/",vehicleControler.createVehicles)
router.put("/:id",vehicleControler.updateVehicles)
router.delete("/", vehicleControler.deleteVehicles)



export const vehicleRouter = router;