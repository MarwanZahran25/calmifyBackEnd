const { prisma } = require("./utils/prismaExport");

async function deleteAllUsers() {
  try {
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`Successfully deleted ${deletedUsers.count} users`);
  } catch (error) {
    console.error("Error deleting users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllUsers();
