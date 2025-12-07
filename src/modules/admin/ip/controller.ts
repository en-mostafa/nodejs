import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../types/auth-request";
import { prisma } from "../../../config/prisma";


export const createIp = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const ip = await prisma.iP.create({ data: req.body });
        res.status(201).json({ data: ip });
    } catch (error) {
        next(error)
    }
}

export const ipLogs = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const ips = await prisma.iP.findMany();
    res.status(200).json({ data: ips, message: "با موفقیت انجام شد" })
}