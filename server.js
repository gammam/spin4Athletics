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

if (module === require.main){
	// [START listen]
	const PORT = process.env.PORT || 8080;
	app.listen(POST,() => {
	console.log('App listening on port ${PORT}');
	console.log('Press Ctrl+C to quit');
	})
	// [END listen]
}

// [END app]
module.exports = app; 

