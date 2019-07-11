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

exports.listSessions = async function(req, res) {
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
  res.status(200).json(allSessions);
};

exports.addSessions = async function(req, res) {
  res.status(200);
};
