import { Router } from "express";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";
import { salary, paymetSalary } from "./controller";
import { upload } from "../../../middlewares/upload";

const router = Router();

//GET
router.get("/index",
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    salary
);

//POST
router.post("/payment",
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    upload.single('image'),
    paymetSalary
)

export default router;