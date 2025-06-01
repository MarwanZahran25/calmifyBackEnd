const { prisma } = require("../utils/prismaExport");
const { calculateBurnout } = require("../utils/burnout");

async function createBurnout(req, res) {
  try {
    const { employeeId } = req.params;
    const sentiments = await prisma.sentiment.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        enteredAt: "desc",
      },
      take: 10,
    });
    const burnout = calculateBurnout(sentiments);
    const burnOutEntry = await prisma.burnOutRisk.create({
      data: {
        risk: burnout,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });
    res.json({ burnOutEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getAllBurnout(req, res) {
  try {
    const burnout = await prisma.burnOutRisk.findMany({
      where: {
        employeeId: req.params.employeeId,
      },
    });
    res.json({ burnout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = { createBurnout, getAllBurnout };
