import { Router } from "express";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";
import { createUser } from "./controller";


const router = Router();

//POST
router.post('/create',
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    createUser
);

//GET

export default router;