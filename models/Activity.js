const mongoose = require("mongoose");
const { Schema } = mongoose;
const ActivityMountainSchema = require("./ActivityMountain");

const activitySchema = new Schema({
  title: String,
  description: String,
  minutes: Number,
  mountains: [ActivityMountainSchema],
  mountainCount: Number
});

mongoose.model("activities", activitySchema);
