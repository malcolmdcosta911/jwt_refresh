require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");
const app = express();
// require("express-async-errors");
require("./startup/logging.js");
require("./startup/db.js")();
require("./startup/cors.js")(app);
require("./startup/routes.js")(app);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  logger.info(`app listening on port ${port}`);
});

//create frontend
//status codes
//json format
//moongose schema not complete
//no req body joi validation added ( needed cause moongose default validtion work only on save())
//no object id validation added
//based on role middleware nt added
//not added .env variable missing error