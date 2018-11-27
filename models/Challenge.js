const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMountain = require("./ChallengeMountain");
const ChallengeUser = require("./ChallengeUser");

const challengeSchema = new Schema({
  title: String,
  description: String,
  users: [ChallengeUser],
  mountains: [ChallengeMountain],
  mountainCount: Number
});

mongoose.model("challenges", challengeSchema);
