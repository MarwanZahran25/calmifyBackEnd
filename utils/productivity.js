async function productivity(employeeId) {
  try {
    let productivity = await prisma.productivity.findMany({
      where: {
        employeeId,
      },
    });

    if (productivity.length === 0) {
      throw new Error("Cannot find productivity data");
    }

    return productivity;
  } catch (error) {
    console.error("Error fetching productivity data:", error);
    throw new Error("Failed to retrieve productivity data");
  }
}
async function averageProductivity(employeeId) {
  try {
    let productivity = await prisma.productivity.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        id: "desc",
      },
      take: 5,
    });

    const totalProductivity = productivity.reduce((acc, cur) => {
      return acc + cur.durationHrs;
    }, 0);

    const averageProductivityHrs = totalProductivity / productivity.length;

    return averageProductivityHrs;
  } catch (error) {
    console.error("Error calculating average productivity:", error);
    throw new Error("Failed to calculate average productivity");
  }
}
module.exports = {
  productivity,
  averageProductivity,
};
