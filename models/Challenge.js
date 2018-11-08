const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMountainSchema = require("./ChallengeMountain");
const ChallengeUserSchema = require("./ChallengeUser");

const challengeSchema = new Schema({
  title: String,
  description: String,
  users: [ChallengeUserSchema],
  mountains: [ChallengeMountainSchema],
  mountainCount: Number
});

mongoose.model("challenges", challengeSchema);
