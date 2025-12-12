import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma";


export const attendanceLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await prisma.attendanceLog.findMany({
            where: {
                userId: Number(req.query.id),
                date: {
                    startsWith: req.query.date as string
                }
            }
        });
        res.status(200).json({ data: logs, message: "با موفقیت انجام شد" })
    } catch (error) {
        next(error)
    }
}

export const attendanceUpdateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const update = await prisma.attendanceLog.update({
            where: {
                id: Number(req.body.id)
            },
            data: { status: req.body.status }
        });
        res.status(201).json({ data: update, message: 'با موفقیت انجام شد' })
    } catch (error) {
        next(error)
    }
}

