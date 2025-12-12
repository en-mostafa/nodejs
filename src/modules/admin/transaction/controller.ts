import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma";

export const transaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const year = Number(req.query.date);
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

        const transactions = await prisma.monthlySummary.findMany({
            where: {
                userId: Number(req.query.id),
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });
        res.status(200).json({ data: transactions, message: "با موفقیت انجام شد" })
    } catch (error) {
        next(error)
    }
}