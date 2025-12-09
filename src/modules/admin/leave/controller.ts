import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma";

export const logLeaves = async (req: Request, res: Response) => {

    const leaves = await prisma.leaveRquest.findMany({
        orderBy: {
            status: "asc"
        },
        include: { user: true }
    });

    res.status(200).json({ data: leaves, message: 'باموفقیت انجام شد' })
}

export const updateLeave = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const update = await prisma.leaveRquest.update({
            where: {
                id: req.body.id
            },
            data: { status: req.body.status }
        });
        res.status(200).json({ data: update, message: 'باموفقیت انجام شد' })
    } catch (error) {
        next(error)
    }
}