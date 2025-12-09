import { Router } from "express";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";
import { createUser, userLog } from "./controller";


const router = Router();

//POST
router.post('/create',
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    createUser
);

//GET
router.get("/index",
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    userLog
)

export default router;