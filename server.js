require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");
const app = express();
require("express-async-errors");
require("./startup/db.js")();
require("./startup/cors.js")(app);
require("./startup/routes.js")(app);

const port = 3500;
app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`);
  logger.info(`app listening on port ${port}`);
});
