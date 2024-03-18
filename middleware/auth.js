const jwt = require("jsonwebtoken");

//check status codes

//check acess token expired
//only need proper access token for requests
module.exports = function (req, res, next) {
  const accessToken = req.get("x-access-token");
  if (!accessToken)
    return res.status(401).send("Access Denied. No token provided.");

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    console.log(decoded.userInfo.permissions);
    req.user = decoded.userInfo;
    req.permissions = decoded.userInfo.permissions;
    next();
  } catch (err) {
    // err
    return res.status(400).send("Invalid Token.");
  }
};
