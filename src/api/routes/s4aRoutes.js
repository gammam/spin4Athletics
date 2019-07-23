module.exports = function(app) {
  // var s4a = require("../controllers/s4aController");
  var admin = require("../controllers/s4aAdmin");
  // test Routes

  app.route("/").get(function(req, res) {
    res.send("Hello World!");
  });

  // spin4Athletics Routes

  // Admin operations
  app
    .route("/v1/admin/sessions")
    .get(admin.listSessions)
    .post(admin.addSessions);
  // app
  //   .route("v1/admin/team")
  //   .put(admin.createTeam)
  //   .get(admin.getTeam);

  // app
  //   .route("v1/admin/athlete")
  //   .put(admin.createAthlete)
  //   .get(admin.getAthlete);

  /* TODO - Manage  Athlete 
  app
    .route("/v1/:athleteId/sessions")
    .post(s4a.create_a_session)
    .get(s4a.get_all_sessions_by_user);
    

  app
  .route("/v1/:athleteId/sessions/:sessionId")
  .post(s4a.update_a_session)
  .put(s4a.add_a_session)
  .get(s4a.read_a_session)
  .delete(s4a.delete_a_session);
*/
};
