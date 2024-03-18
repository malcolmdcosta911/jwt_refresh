const mongoose = require("mongoose");
const logger = require("../utils/logger");

module.exports = function () {
  const db = process.env.MONGO_URL ; 
  mongoose
    .connect(db) //change
    .then(() => logger.info(`Connect to mongo `))
    // .catch(err=>logger.error(`Connect to mongo `));
};
