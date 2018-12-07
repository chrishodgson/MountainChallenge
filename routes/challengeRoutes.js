const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");

module.exports = app => {
  //get challenges
  app.get("/api/challenges", requireLogin, async (req, res) => {
    //todo: restrict by user logged in
    const challenges = await Challenge.find();
    res.send(challenges);
  });

  //add challenge
  app.post("/api/challenges", requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const challenge = new Challenge({
      // _users: [{req.user._id}],
      title
    });

    try {
      await challenge.save();
      res.send({});
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
