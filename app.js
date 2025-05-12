require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/user");
const productivityRouter = require("./routes/productivity");
const sessionRouter = require("./routes/session");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
app.use("/productivity", productivityRouter);
app.use("/user", userRouter);
app.use("/session", sessionRouter);
app.listen(port, () => {
  console.log(`Running on localhost:${port}`);
});

