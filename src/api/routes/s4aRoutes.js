module.exports = function(app) {
  var s4a = require("../controllers/s4aController");

  // test Routes

  app.route("/").get(function(req, res) {
    res.send("Hello World!");
  });

  // spin4Athletics Routes
  app
    .route("/:athleteId/sessions")
    .post(s4a.create_a_session)
    .get(s4a.get_all_sessions_by_user);

  app.route("/sessions").get(s4a.list_all_sessions);

  app
    .route("/sessions/:sessionId")
    .get(s4a.read_a_session)
    .delete(s4a.delete_a_session);
};
