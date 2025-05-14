require("dotenv").config();
const axios = require("axios");
const express = require("express");
const userRouter = require("./routes/user");
const productivityRouter = require("./routes/productivity");
const sessionRouter = require("./routes/session");
const sentimentRouter = require("./routes/sentiment");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
app.use("/productivity", productivityRouter);
app.use("/user", userRouter);
app.use("/session", sessionRouter);
app.use("/sentiment", sentimentRouter);
app.listen(port, () => {
  console.log(`Running on localhost:${port}`);
});
