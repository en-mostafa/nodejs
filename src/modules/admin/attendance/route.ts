import { Router } from "express";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";
import { attendanceLog, attendanceUpdateStatus } from "./controller";

const router = Router();

//GET
router.get('/index',
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    attendanceLog
)

//PUT
router.put('/update',
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    attendanceUpdateStatus
)
export default router