require("dotenv").config(); // Load .env file
const logger = require("./src/logger.js");

// const functions = require('firebase-functions'),
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./src/api/routes/s4aRoutes"); //importing route
routes(app); //register the route

if (module === require.main) {
  // [START listen]
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    logger.info("App listening on port %d", PORT);
    logger.info("Press Ctrl+C to quit");
  });
  // [END listen]
}

// [END app]
module.exports = app;
