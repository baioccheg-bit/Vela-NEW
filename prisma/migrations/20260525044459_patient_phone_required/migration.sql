/*
  Warnings:

  - Made the column `phone` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "phone" SET NOT NULL;
