const { prisma } = require("../utils/prismaExport");
const axios = require("axios");
async function addNote(req, res) {
  try {
    let response;
    const text = req.body.text;
    try {
      response = await axios.post(`${process.env.SERVER}/predict`, {
        text,
      });
    } catch (error) {
      //throw new Error("could not connect to sentiment analysis service");
      throw new Error("could not connect to sentiment analysis service");
    }
    const note = await prisma.note.create({
      data: {
        employeeId: req.user.employeeId,
        noteText: text,
        noteAnalysis: response.data.prediction,
      },
    });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function getUserNotes(req, res) {
  try {
    const notes = await prisma.note.findMany({
      where: {
        employeeId: req.user.employeeId,
      },
    });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function getAllNotes(req, res) {
  try {
    const notes = await prisma.note.findMany();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addNote, getUserNotes, getAllNotes };
