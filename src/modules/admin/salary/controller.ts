import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma";

export const salary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.query.id)
        const year = Number(req.query.date);
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

        const wallet = await prisma.wallet.findUnique({ where: { userId } });

        const transactions = await prisma.monthlySummary.findMany({
            where: {
                userId,
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                user: true
            }
        });
        res.status(200).json({ data: { transactions, wallet }, message: "با موفقیت انجام شد" })
    } catch (error) {
        next(error)
    }
}

export const paymetSalary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            id,
            amount,
            userId,
            date,
            description,
            salary
        } = req.body;

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : null;


        const payment = await prisma.walletTransaction.create({
            data: {
                amount,
                userId: Number(userId),
                image,
                date,
                description
            }
        });

        const summary = await prisma.monthlySummary.findUnique({
            where: { id: Number(id), userId: Number(userId) }
        });

        if (!summary) {
            throw new Error('Monthly summary not found');
        }

        const newTotalPaid = summary.totalPaid ?? 0 + Number(amount);
        const totalRemain = Number(salary) - newTotalPaid;

        await prisma.monthlySummary.update({
            where: { id: Number(id), userId: Number(userId) },
            data: {
                totalPaid: newTotalPaid,
                totalRemain,
            }
        })
        res.status(201).json({ data: payment, message: 'با موفقیت انجام شد' });

    } catch (error) {
        next(error)
    }
}