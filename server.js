console.log("test log");
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
    console.log("App listening on port ", PORT);
    console.log("Press Ctrl+C to quit");
  });
  // [END listen]
}

// [END app]
module.exports = app;
