///////  MONGODB
const url = require("url");
const MongoClient = require("mongodb").MongoClient;
const logger = require("../../logger.js");

// Create cached connection variable
let cachedDb = null;

// a function for connecting to MOngoDB
// taking a single parameter of the connection string

async function connectToDatabase(uri) {
  //if the database connection is cached ,
  //use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }
  //if no connection is cached, create a new one
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });

    //seect the database through the connection,
    //using the database ath of the connection string
    const db = await client.db(url.parse(uri).pathname.substr(1));

    // cache the database connection and return the connection
    cachedDb = db;
    return db;
  } catch (e) {
    logger.error("error db connection");
    throw e;
  }
}

exports.listSessions = function(req, res) {
  var errorJson = {
    code: "",
    message: ""
  };

  logger.info("list all sessions");
  logger.debug("queryString = ", req.query.test);

  var skip = parseInt(req.query.skip) || 0;
  var limit = parseInt(req.query.limit) || 0;
  var queryString = req.query.queryString ? req.query.queryString : {};

  connectToDatabase(process.env.MONGODB_URI)
    .then(db => {
      logger.debug("DB raggiunto");
      db.collection("sessions")
        .find(queryString)
        .skip(skip)
        .limit(limit)
        .toArray()
        .then(arr => {
          var result = {};
          result["total_results"] = Array.from(arr).length;
          result["results"] = arr;
          res.status(200).json(result);
        })
        .catch(err => {
          logger.error("Error: ", err.message);
          errorJson.code = 500;
          errorJson.message = err.message;
          res.status(500).json(errorJson);
        });
    })
    .catch(err => {
      logger.error("Error1: ", err.message);
      errorJson.code = 500;
      errorJson.message = err.message;
      res.status(500).json(errorJson);
    });

  //respond with the array created
  // as a json
};

//TODO
exports.addSessions = async function(req, res) {
  logger.info("Add Session");
  logger.debug("");
  res.status(200);
};

exports.createTeam = async function(req, res) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const teams = await db.collection("teams");
  const newTeam = req.body;

  const insertResult = teams.insertOne(newTeam);

  if (insertResult.acknowledged) {
    res.status(200).json({ "insertedId ": insertResult.insertedId });
  }
};
