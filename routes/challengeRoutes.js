const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Challenge = mongoose.model("challenges");

module.exports = app => {
  //get challenges
  app.get("/api/challenges", requireLogin, async (req, res) => {
    //todo: how to get a list of challenges that the user is a member of
    const challenges = await Challenge.find();
    res.send(challenges);
  });

  //add challenge
  app.post("/api/challenges", requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const challenge = new Challenge({
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
