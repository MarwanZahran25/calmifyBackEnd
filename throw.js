const { prisma } = require("./utils/prismaExport");

async function seedTherapySessions() {
  try {
    console.log("Starting therapy sessions seeding...");

    // Define session times (4 sessions per day) - these will be local times
    const sessionTimes = [
      { hour: 9, minute: 0 }, // 9:00 AM
      { hour: 11, minute: 0 }, // 11:00 AM
      { hour: 14, minute: 0 }, // 2:00 PM
      { hour: 16, minute: 0 }, // 4:00 PM
    ];

    // Start from today
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0); // Reset to beginning of day

    // End date - one year from now
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    const sessionsToCreate = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      // Skip Friday (5) and Saturday (6) - these are days off
      if (dayOfWeek !== 5 && dayOfWeek !== 6) {
        // Create 4 sessions for this workday
        for (const sessionTime of sessionTimes) {
          // Create a new date for each session using local timezone
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const day = currentDate.getDate();

          const sessionDate = new Date(
            year,
            month,
            day,
            sessionTime.hour,
            sessionTime.minute,
            0,
            0
          );

          // Debug log to verify the date is correct (first few only to avoid spam)
          if (sessionsToCreate.length < 10) {
            console.log(
              `Creating session for: ${sessionDate.toLocaleString()} (UTC: ${sessionDate.toISOString()})`
            );
          }

          sessionsToCreate.push({
            date: sessionDate,
            reserved: false,
            employeeId: null, // Initially not assigned to any employee
          });
        }
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(`Creating ${sessionsToCreate.length} therapy sessions...`);

    // Create sessions in batches to avoid potential memory issues
    const batchSize = 100;
    let created = 0;

    for (let i = 0; i < sessionsToCreate.length; i += batchSize) {
      const batch = sessionsToCreate.slice(i, i + batchSize);
      await prisma.therapySessions.createMany({
        data: batch,
        skipDuplicates: true,
      });
      created += batch.length;
      console.log(`Created ${created}/${sessionsToCreate.length} sessions...`);
    }

    console.log(
      `✅ Successfully created ${sessionsToCreate.length} therapy sessions!`
    );
    console.log(
      `📅 Sessions span from ${startDate.toDateString()} to ${endDate.toDateString()}`
    );
    console.log(
      `🕒 4 sessions per workday at: 9:00 AM, 11:00 AM, 2:00 PM, 4:00 PM`
    );
    console.log(
      `📋 Workdays: Sunday, Monday, Tuesday, Wednesday, Thursday (Friday & Saturday off)`
    );
  } catch (error) {
    console.error("Error seeding therapy sessions:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Alternative function to clear existing sessions (use with caution!)
async function clearTherapySessions() {
  try {
    console.log("⚠️  Clearing all existing therapy sessions...");
    const result = await prisma.therapySessions.deleteMany({});
    console.log(`🗑️  Deleted ${result.count} therapy sessions`);
  } catch (error) {
    console.error("Error clearing therapy sessions:", error);
  }
}

// Helper function to get sessions count by date range
async function getSessionsStats() {
  try {
    const total = await prisma.therapySessions.count();
    const reserved = await prisma.therapySessions.count({
      where: { reserved: true },
    });
    const available = total - reserved;

    console.log(`📊 Therapy Sessions Statistics:`);
    console.log(`   Total sessions: ${total}`);
    console.log(`   Reserved: ${reserved}`);
    console.log(`   Available: ${available}`);

    return { total, reserved, available };
  } catch (error) {
    console.error("Error getting sessions stats:", error);
  }
}

// Run the seeder
if (require.main === module) {
  seedTherapySessions()
    .then(() => getSessionsStats())
    .then(() => {
      console.log("✨ Seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

module.exports = {
  seedTherapySessions,
  clearTherapySessions,
  getSessionsStats,
};
