// Initialize Firestore admin
const admin = require("firebase-admin");

const serviceAccount = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount))
});

const db = admin.firestore();
var sessionsCollection = db.collection("sessions");

exports.list_all_sessions = function(req, res) {
  console.log("list all sessions");
  var athleteId = req.params.athleteId;
  console.log("athledId = ", athleteId);
  let allSessions = [];
  sessionsCollection
    // .where("athledeId", "==", athleteId)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        allSessions.push({
          docId: doc.id,
          sessionData: doc.data()
        });
      });
      //respond with the array created
      // as a json
      res.json({
        statusCode: 200,
        statusResponse: "OK",
        messages: "All sessions",
        data: allSessions
      });
    });
};

exports.get_all_sessions_by_user = function(req, res) {
  var athleteId = String(req.params.athleteId);
  console.log("get_all_sessions_by_user: ", athleteId);

  let allSessions = [];

  let usersSessions = sessionsCollection.where("athleteId", "==", athleteId);
  usersSessions.get().then(snapshot => {
    snapshot.forEach(doc => {
      console.log("retrieve data :", doc.id);
      allSessions.push({
        docId: doc.id,
        sessionData: doc.data()
      });
    });
    //respond with the array created
    // as a json
    res.json({
      statusCode: 200,
      statusResponse: "OK",
      messages: "All sessions",
      data: allSessions
    });
  });
};

exports.read_a_session = function(req, res) {};
exports.delete_a_session = function(req, res) {};
exports.create_a_session = function(req, res) {};
