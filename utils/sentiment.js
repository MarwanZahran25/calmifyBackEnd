const { prisma } = require("./prismaExport");
async function getSentiments(employeeId) {
  const sentiments = await prisma.sentiment.findMany({
    where: {
      employeeId,
    },
    orderBy: {
      enteredAt: "desc",
    },
    take: 10,
  });
  return sentiments;
}
module.exports = { getSentiments };
