import { Router } from "express";
import { userControler } from "./user.controler";

const router = Router();

router.get("/", userControler.getUser);
router.put("/", userControler.getUser);
router.delete("/", userControler.deleteUser)

export const userRouter = router;
