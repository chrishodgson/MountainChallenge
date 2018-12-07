const mongoose = require("mongoose");
const { Schema } = mongoose;
// const ChallengeMountain = require("./ChallengeMountain");

const activitySchema = new Schema({
  title: String,
  description: String,
  mountainCount: Number,
  durationMinutes: Number,
  startDate: Date,
  _users: [{ type: Schema.Types.ObjectId, ref: "User" }]
  // _mountains: [ChallengeMountain]
});

mongoose.model("activities", activitySchema);
