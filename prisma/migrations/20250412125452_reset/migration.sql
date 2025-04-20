/*
  Warnings:

  - You are about to drop the `TherapySessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TherapySessions" DROP CONSTRAINT "TherapySessions_employeeId_fkey";

-- DropTable
DROP TABLE "TherapySessions";
