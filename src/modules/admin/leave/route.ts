import { Router } from "express";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";
import { logLeaves, updateLeave } from "./controller";

const router = Router()

//GET
router.get("/leaves",
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    logLeaves
)

//PUT
router.put("/leave",
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    updateLeave
)

export default router