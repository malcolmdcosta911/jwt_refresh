const cors = require("cors");

// const whitelist = ["http://example1.com", "http://example2.com"];

const whitelist = process.env.ALLOWED_IPS.split(", ");

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  //credentials: Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
  //res.header('Access-Control-Allow-Credentials', true);

  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//block ips other than  http://127.0.0.1:3500 , "*" --> all ips allowed
// var corsOptions = {
//   origin: "http://127.0.0.1:3500",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

module.exports = function (app) {
  app.use(cors(corsOptions));
};

// This happens when you load your page in the same origin that you are making API calls to. The browser doesn't set the "Origin" header unless the API call's domain is different from the one where the page is being served.

// This is further explained here https://github.com/expressjs/cors/issues/113

// If you make your API call using the browser console, from within a different website, you'll see that the browser sets the Origin header, and thus it will not be undefined when read by express.

// You can account for this by using

// if (whitelist.indexOf(origin) !== -1 || !origin)
