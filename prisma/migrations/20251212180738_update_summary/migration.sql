/*
  Warnings:

  - Added the required column `status` to the `MonthlySummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MonthlySummary` ADD COLUMN `status` ENUM('SETTLED', 'UNSETTLED') NOT NULL,
    ADD COLUMN `totalPaid` DOUBLE NULL,
    ADD COLUMN `totalRemain` DOUBLE NULL;
