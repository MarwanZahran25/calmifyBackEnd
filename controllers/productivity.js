const {prisma} = require("../utils/prismaExport");

async function productivity(req, res) {
    try {
        const productivity = await prisma.productivity.findMany({
            where: {
                employeeId: req.user.employeeId,
            }
        });

        if (productivity.length === 0 ) {
            return res.status(400).send("Cannot find productivity data");
        }

        res.json(productivity);
    } catch (error) {
        console.error("Error fetching productivity data:", error);
        res.status(500).json({ error: "Failed to retrieve productivity data" });
    }
}

async function averageProductivity(req, res) {
    try {
        const productivity = await prisma.productivity.findMany({
            where: {
                employeeId: req.user.employeeId,
            }
        });

        if (productivity.length === 0) {
            return res.status(400).send("Cannot find productivity data");
        }

        const totalProductivity = productivity.reduce((acc, cur) => {
            return acc + cur.durationHrs;
        }, 0);

        const averageProductivityHrs = totalProductivity / productivity.length;

        res.json(averageProductivityHrs);
    }

    catch (error) {
        console.error("Error calculating average productivity:", error);
        res.status(500).json({ error: "Failed to calculate average productivity" });
    }
}
module.exports = {productivity,averageProductivity};