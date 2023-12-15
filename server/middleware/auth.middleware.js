const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
console.log("token", token)
  if (token) {
    jwt.verify(token, "rittik", (err, decoded) => {
      if (decoded) {
        console.log("decode", decoded)
        req.body.userID = decoded.userID;
        next();
      } else {
        res.send({ msg: "Token didn't match, Please Login First!" });
      }
    });
  } else {
    res.send({ msg: "Please Login First!" });
  }
};
module.exports = { auth };
