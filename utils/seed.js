const { prisma } = require("./prismaExport");

async function seed() {
  try {
    const a = await prisma.employee.update({
      where: {
        id: 1,
      },
      data: {
        role: "adMin",
      },
    });
    console.log(a);
  } catch (error) {
    console.error(error);
  }
}

seed();
