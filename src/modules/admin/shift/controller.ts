import { NextFunction, Request, Response } from "express";
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

export const shift = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shift = await prisma.shift.findUnique({
            where: {
                id: Number(req.query.id),
            },
            include: {
                shiftSchedules: true,
                ips: true
            }

        });
        res.status(200).json({ data: shift, message: "با موفقیت انجام شد" })
    } catch (error) {
        next(error)
    }
}

export const updateShift = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, shiftSchedules, ips, holidays } = req.body;
        const update = await prisma.shift.update({
            where: {
                id: Number(req.query.id)
            },
            data:
            {
                name,
                holidays,
                ips,
                shiftSchedules: {
                    deleteMany: { shiftId: Number(req.query.id) }, // حذف همه قدیمی‌ها
                    create: shiftSchedules.create        // ایجاد جدید
                }
            }
        });
        res.status(200).json({ data: update, message: 'با موفقیت انجام شد' })
    } catch (error) {
        next(error)
    }
}

export const deleteShift = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await prisma.shiftSchedule.deleteMany({ where: { shiftId: id } })
        await prisma.shift.delete({ where: { id } });
        res.status(200).json({ message: 'با موفقیت انجام شد' })
    } catch (error) {
        next(error)
    }
}