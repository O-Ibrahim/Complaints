const jwt = require("jsonwebtoken");
const config = require("../config");
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.jwtSecret, (err, data) => {
      if (err) {
        res.status(403).send();
        return;
      }
      req.userID = data.id;
      req.userType = data.type;
      next();
    });
  } else {
    res.status(401).send();
    return;
  }
};
module.exports = validateToken;
