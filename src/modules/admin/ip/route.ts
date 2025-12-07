import { Router } from "express";
import { validate } from "../../../middlewares/validate";
import { ipSchema } from "./validate";
import { createIp, ipLogs } from "./controller";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";

const router = Router();

//POST
router.post('/create',
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    validate(ipSchema),
    createIp
);

//GET
router.get('/index', authMiddelware, roleMiddleware(Role.ADMIN), ipLogs)


export default router;