import { Router } from "express";
import { validate } from "../../../middlewares/validate";
import { createShiftSchema } from "./validate";
import { createShift, logShift } from "./controller";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";


const router = Router();

//POST
router.post('/create',
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    validate(createShiftSchema),
    createShift
);

//GET
router.get("/index", authMiddelware, roleMiddleware(Role.ADMIN), logShift)

export default router;