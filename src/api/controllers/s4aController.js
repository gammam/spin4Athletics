///////  MONGODB
const url = require("url");
const MongoClient = require("mongodb").MongoClient;

// Create cached connection variable
let cachedDb = null;

// a function for connecting to MOngoDB
// taking a single parameter of the connection string

async function connectToDatabase(uri) {
  //if the database connection is cached ,
  //use it instead of creating a new connection
  if (cachedDb) {
    return cachedDd;
  }
  //if no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  //seect the database through the connection,
  //using the database ath of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1));

  // cache the database connection and return the connection
  cachedDb = db;
  return db;
}

exports.list_all_sessions = async function(req, res) {
  console.log("list all sessions");
  var athleteId = req.params.athleteId;
  console.log("athledId = ", athleteId);
  console.log(process.env.MONGODB_URI);
  const db = await connectToDatabase(process.env.MONGODB_URI);

  //Select sessions collection
  const sessionsCollection = await db.collection("sessions");
  //select all the sessions
  const allSessions = await sessionsCollection.find({}).toArray();

  //respond with the array created
  // as a json
  res.json({
    statusCode: 200,
    statusResponse: "OK",
    messages: "All sessions",
    data: allSessions
  });
};

exports.get_all_sessions_by_user = async function(req, res) {
  var athleteId = String(req.params.athleteId);
  console.log("get_all_sessions_by_user: ", athleteId);

  var queryFilter = {};
  queryFilter["Name"] = athleteId;

  console.log("queryFilter: ", queryFilter);

  const db = await connectToDatabase(process.env.MONGODB_URI);
  //Select sessions collection
  const sessionsCollection = await db.collection("sessions");
  //select all the sessions
  const userSessions = await sessionsCollection.find(queryFilter).toArray();

  //respond with the array created
  // as a json
  res.json({
    statusCode: 200,
    statusResponse: "OK",
    messages: "get_all_sessions_by_user",
    data: userSessions
  });
};

exports.read_a_session = function(req, res) {};
exports.delete_a_session = function(req, res) {};
exports.create_a_session = function(req, res) {};

exports.insert_many_sessions = async function(req, res) {
  console.log("insert many sessions");
  console.log("body: ", req.body);

  const db = await connectToDatabase(process.env.MONGODB_URI);

  //Select sessions collection
  const sessionsCollection = await db.collection("sessions");
  //select all the sessions

  const insertResult = await sessionsCollection.insertMany(req.body);

  console.log("insertResult: ", insertResult);

  res.json({
    statusCode: 200,
    statusResponse: "OK",
    messages: "updated"
  });
};
