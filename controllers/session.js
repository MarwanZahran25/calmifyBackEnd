const { prisma } = require("../utils/prismaExport");

async function availableSessions(req, res) {
  try {
    const availableSession = await prisma.therapySessions.findMany({
      where: {
        reserved: false,
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
      take: parseInt(req.query.limit),
    });
    res.json(availableSession);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("something went wrong");
  }
}
async function reserveSession(req, res) {
  try {
    const reservedSession = await prisma.therapySessions.update({
      where: { id: req.body.sessionId },
      data: { reserved: true, employeeId: req.user.employeeId },
    });
    res.json(reservedSession);
  } catch (err) {
    res.status(500).json(err);
  }
}
async function currentUserSession(req, res) {
  const usersSessions = await prisma.therapySessions.findMany({
    where: {
      employeeId: req.user.employeeId,
    },
  });
  res.json(usersSessions);
}
module.exports = {
  availableSessions,
  reserveSession,
  currentUserSession,
};
let date = new Date(date)