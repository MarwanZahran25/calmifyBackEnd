-- CreateTable
CREATE TABLE "TherapySessions" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "reserved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TherapySessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TherapySessions" ADD CONSTRAINT "TherapySessions_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
