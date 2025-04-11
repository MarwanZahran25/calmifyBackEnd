jwt = require("jsonwebtoken");
async function verifyToken(req, res,next) {
   try{ const token =  req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = await decodedToken;
    next();
   }
    catch(err){
       res.status(401).json("Invalid request");
    }

}
module.exports = verifyToken;