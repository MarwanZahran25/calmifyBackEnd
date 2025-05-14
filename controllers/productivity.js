const { prisma } = require("../utils/prismaExport");
const productivityUtils = require("../utils/productivity");

async function productivity(req, res) {
  try {
    const productivity = await productivityUtils.productivity(
      req.user.employeeId
    );
    res.json(productivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function averageProductivity(req, res) {  
  try {
    const averageProductivity = await productivityUtils.averageProductivity(
      req.user.employeeId
    );
    res.json(averageProductivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { productivity, averageProductivity };
