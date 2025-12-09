import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../../config/prisma";
import { Role } from "../../../types/jwt";

//User register
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { phone } });
        if (existingUser) {
            return res.status(400).json({ error: 'کاربر از قبل ثبت نام شده است' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { ...req.body, password: hashedPassword },
        });
        const userInfo = {
            id: user.id,
            name: user.name,
            family: user.family
        }
        res.status(201).json({ data: userInfo, message: 'با موفقیت ثبت شد' })
    } catch (err) {
        next(err)
    }
}

export const userLog = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        where: {
            role: Role.USER
        }
    });
    res.status(200).json({ data: users, message: "با موفقیت انجام شد" })
}
