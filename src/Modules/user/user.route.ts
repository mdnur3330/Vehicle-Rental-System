import { Router } from "express";
import { userControler } from "./user.controler";
import { auth } from "../../Middelware.ts/auth";

const router = Router();

router.get("/", auth(), userControler.getUser);
router.put("/:id", auth(), userControler.updateUser);
router.delete("/", userControler.deleteUser)

export const userRouter = router;
