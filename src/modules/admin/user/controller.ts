import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../../config/prisma";
import { Role } from "../../../types/jwt";
import { date } from "zod";

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

export const userInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.query.id)
            }
        });
        if (!user) {
            return res.status(404).json({ message: "کاربر یافت نشد" });
        }

        res.status(200).json({ data: user, message: "با موفقیت انجام شد" })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, password, ...rest } = req.body;
        const data: any = { ...rest };

        if (typeof password === "string" && password.trim() !== "") {
            data.password = await bcrypt.hash(password, 10);
        }

        const updateUser = await prisma.user.update({
            where: { id },
            data
        });
        res.status(200).json({ data: updateUser, message: "با موفقیت انجام شد" })
    } catch (error) {
        next(error)
    }
}