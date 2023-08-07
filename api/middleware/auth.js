const jwt = require("jsonwebtoken");

const config = process.env;
const verifyToken = (req, res, next) => {
  const BearerToken = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : req.headers.authorization;

  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    BearerToken;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
