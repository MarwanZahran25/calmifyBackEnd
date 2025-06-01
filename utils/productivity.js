const { prisma } = require("./prismaExport");
async function productivity(employeeId, noOfDays) {
  try {
    let productivity = await prisma.productivity.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: noOfDays,
    });

    if (productivity.length === 0) {
      throw new Error("Cannot find productivity data");
    }

    return productivity;
  } catch (error) {
    throw error;
  }
}
async function averageProductivity(employeeId, noOfDays) {
  try {
    let productivity = await prisma.productivity.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        id: "desc",
      },
      take: noOfDays,
    });
    if (productivity.length === 0) {
      throw new Error("Cannot find productivity data");
    }

    const totalProductivity = productivity.reduce((acc, cur) => {
      return acc + cur.durationHrs;
    }, 0);

    const averageProductivityHrs = totalProductivity / productivity.length;

    return averageProductivityHrs;
  } catch (error) {
    throw error;
  }
}
async function totalProductivity(employeeId, noOfDays) {
  try {
    let productivity = await prisma.productivity.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        id: "desc",
      },
      take: noOfDays,
    });
    const totalProductivity = productivity.reduce((acc, curr) => {
      return acc + curr.durationHrs;
    }, 0);
    return totalProductivity;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  productivity,
  averageProductivity,
  totalProductivity,
};
