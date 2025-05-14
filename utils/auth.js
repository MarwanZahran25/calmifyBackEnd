jwt = require("jsonwebtoken");
async function verifyUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    req.user = await decodedToken;
    next();
  } catch (err) {
    res.status(401).json("Invalid request");
  }
}
async function verifyAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    res.status(401).json("Only admins are allowed to access this resource");
  }
  next();
}
module.exports = { verifyUser, verifyAdmin };
