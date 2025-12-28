import { Router } from "express";
import { authControler } from "./auth.controler";

const router = Router()
router.post("/signup",authControler.createUser);
router.post("/signin",authControler.createUser);

export const authRouter = router;