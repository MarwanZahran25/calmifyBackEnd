const { prisma } = require("../utils/prismaExport");
const axios = require("axios");
const { totalProductivity } = require("../utils/productivity");
const { getSentiments } = require("../utils/sentiment");
const { calculateBurnout } = require("../utils/burnout");
async function recommend(req, res) {
  try {
    try {
      const lastOne = await prisma.recommendation.findFirst({
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
      console.log("handeled");
    }
    const { employeeId } = req.user;
    const productivity = await totalProductivity(employeeId, 5);
    const sentimens = await getSentiments(employeeId);

    const burnout = calculateBurnout(sentimens);
    const dataObj = {
      Risk: burnout,
      Working_Hours: productivity,
    };
    const recommendationReq = await axios.post(
      `${process.env.SERVER}/process-employee`,
      dataObj
    );
    const recommendationData = recommendationReq.data["Refined_Recommendation"];

    const recommendationEntry = await prisma.recommendation.create({
      data: {
        recommendation: recommendationData,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });
    res.json(recommendationEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function all(req, res) {
  try {
    const recommendation = await prisma.recommendation.findMany({
      where: {
        employeeId: req.user.employeeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(recommendation);
    if (recommendation.length === 0) {
      res.status(404).json({ message: "No recommendations found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = {
  recommend,
  all,
};
