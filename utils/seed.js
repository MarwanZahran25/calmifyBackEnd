const { prisma } = require("./prismaExport");
async function seed() {
  const burnOutRisks = await prisma.burnOutRisk.findMany({
    take: 5,
  });
  console.log(burnOutRisks);
}

seed();
