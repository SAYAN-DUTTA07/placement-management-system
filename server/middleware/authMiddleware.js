const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  // console.log("Authorization Header:", req.headers.authorization);
  
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    token = req.headers.authorization.split(" ")[1];

    try {

      req.user = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      next();

    }
    catch (err) {

      res.status(401).json({
        message: "Invalid Token"
      });

    }

  }
  else {

    res.status(401).json({
      message: "Unauthorized"
    });

  }

};

const authorize = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        message: "Forbidden"
      });

    }

    next();

  };

};

module.exports = {
  protect,
  authorize
};