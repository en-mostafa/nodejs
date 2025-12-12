import { Router } from "express";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";
import { transaction } from "./controller";

const router = Router();

//GET
router.get("/index",
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    transaction
);

export default router;