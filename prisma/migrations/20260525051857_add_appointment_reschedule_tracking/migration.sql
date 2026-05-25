-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "originalStartsAt" TIMESTAMP(3),
ADD COLUMN     "rescheduledAt" TIMESTAMP(3);
