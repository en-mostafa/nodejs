import { Router } from "express";
import { authMiddelware } from "../../../middlewares/auth";
import { roleMiddleware } from "../../../middlewares/role";
import { Role } from "../../../types/jwt";
import { createUser, updateUser, userInfo, userLog } from "./controller";


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

router.get('/info',
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    userInfo
)

//PUT
router.put('update-user',
    authMiddelware,
    roleMiddleware(Role.ADMIN),
    updateUser
)
export default router;