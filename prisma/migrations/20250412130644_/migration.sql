-- DropForeignKey
ALTER TABLE "TherapySessions" DROP CONSTRAINT "TherapySessions_employeeId_fkey";

-- AlterTable
ALTER TABLE "TherapySessions" ALTER COLUMN "employeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TherapySessions" ADD CONSTRAINT "TherapySessions_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
