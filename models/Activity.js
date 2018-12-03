const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMountain = require("./ChallengeMountain");
const ChallengeUser = require("./ChallengeUser");

const activitySchema = new Schema({
  title: String,
  description: String,
  mountainCount: Number,
  durationMinutes: Number,
  startDate: Date,
  _users: [ChallengeUser],
  _mountains: [ChallengeMountain]
});

mongoose.model("activities", activitySchema);
