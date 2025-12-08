import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../types/auth-request";
import { prisma } from "../../../config/prisma";

export const createShift = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const shift = await prisma.shift.create({ data: req.body });
        res.status(201).json({ data: shift })
    } catch (error) {
        next(error)
    }
}

export const logShift = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const shifts = await prisma.shift.findMany();
    const shiftSchedule = await prisma.shiftSchedule.findMany({
        where: {
            shiftId: {
                in: shifts.map(s => s.id)
            }
        }
    });

    const result = shifts.map(shift => {
        const hasActive = shiftSchedule.some(sh => sh.shiftId === shift.id && sh.isActive);
        return {
            ...shift,
            isActive: hasActive
        };
    });

    res.status(200).json({ data: result, messgae: 'باموفقیت انجام شد' })
}