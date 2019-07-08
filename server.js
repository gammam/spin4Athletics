console.log("test log");
// const functions = require('firebase-functions'), 
const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./src/api/routes/s4aRoutes"); //importing route
routes(app); //register the route

// app.listen(port);

module.exports = app; 
// exports.app = functions.https.onRequest(app);
console.log("todo list RESTful API server started on: " + port);
