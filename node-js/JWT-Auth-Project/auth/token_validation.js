const { verify, decode } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.headers.authorization; //.get("authorization");
    if (token) {
      token = token.split(' ')[1]; //token.slice(7);
      verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
          res.json({
            sucess: 0,
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        sucess: 0,
        message: "Access denied, Unauthorized user",
      });
    }
  },
};