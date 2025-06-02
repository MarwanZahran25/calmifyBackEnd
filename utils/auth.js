jwt = require("jsonwebtoken");
async function verifyUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    req.user = await decodedToken;
    console.log(`${user.email} used a resource`);
    next();
  } catch (err) {
    res.status(401).json("Invalid request");
  }
}
async function verifyAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    req.user = await decodedToken;
    if (req.user.employee.role.toLowerCase() !== "admin") {
      throw new Error(
        `Only admins are allowed to access this resource you are a ${req.user.employee.role}`
      );
    }
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
}
module.exports = { verifyUser, verifyAdmin };
