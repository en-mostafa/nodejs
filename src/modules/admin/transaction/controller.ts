import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma";

export const transaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transactions = await prisma.walletTransaction.findMany({
            where: {
                date: {
                    startsWith: req.query.date as string
                }
            },
            orderBy: {
                createAt: "desc",
            },
            include: { user: true }
        })

        res.status(200).json({ data: transactions, message: "با موفقیت انجام شد" })
    } catch (error) {
        next(error)
    }
}