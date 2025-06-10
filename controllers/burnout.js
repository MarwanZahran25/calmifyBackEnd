const { prisma } = require("../utils/prismaExport");
const { calculateBurnout } = require("../utils/burnout");

async function createBurnout(req, res) {
  try {
    try {
      const lastOne = await prisma.burnOutRisk.findFirstOrThrow({
        where: {
          employeeId: req.user.employeeId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const lastOneDate = new Date(`${lastOne.createdAt}`);
      const today = new Date();
      if (lastOneDate.getDate() === today.getDate()) {
        res.json(lastOne);
        return;
      }
    } catch (err) {
      console.log("nothing");
    }
    const { employeeId } = req.user;
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
        employeeId: req.user.employeeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({ burnout });
    if (burnout.length === 0) {
      res.status(404).json({ message: "No burnout records found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = { createBurnout, getAllBurnout };
