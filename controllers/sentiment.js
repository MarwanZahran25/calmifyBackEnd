const { body } = require("express-validator");
const axios = require("axios");
const { prisma } = require("../utils/prismaExport");
require("dotenv").config();
const { getSentiments } = require("../utils/sentiment");
async function getSentiment(req, res) {
  try {
    const sentiments = await getSentiments(req.user.employeeId);
    res.json(sentiments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function addSentiment(req, res) {
  try {
    let response;

    try {
      response = await axios.post(`${process.env.SERVER}/predict`, {
        text: req.body.text,
      });
    } catch (error) {
      console.error(error);
    }
    const sentiment = await prisma.sentiment.create({
      data: {
        sentimentText: req.body.text,
        sntimentAnalysis: response.data.prediction,
        employeeId: req.user.employeeId,
      },
    });
    res.json(sentiment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
module.exports = { getSentiment, addSentiment };
