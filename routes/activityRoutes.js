const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Activity = mongoose.model("activities");

module.exports = app => {
  //get activities
  app.get("/api/activities", requireLogin, async (req, res) => {
    //todo: restrict by user logged in
    const activities = await Activity.find();
    res.send(activities);
  });

  //add activity
  app.post("/api/activities", requireLogin, async (req, res) => {
    const { title, description, duration, startDate } = req.body;
    const activity = new Activity({
      _users: [req.user._id],
      title, description
      //, duration
      //, startDate
    });

    try {
      await activity.save();
      res.send({});
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
