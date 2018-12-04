const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMountain = require("./ChallengeMountain");
const ChallengeUser = require("./ChallengeUser");

const challengeSchema = new Schema({
  title: String,
  description: String,
  mountainCount: Number,
  _users: [ChallengeUser],
  _mountains: [ChallengeMountain]
});

mongoose.model("challenges", challengeSchema);
