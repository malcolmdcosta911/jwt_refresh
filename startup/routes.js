const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const error = require("../middleware/error");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(cookieParser());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
