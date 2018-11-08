const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMountainSchema = require("./ChallengeMountain");

const challengeSchema = new Schema({
  title: String,
  created: Date,
  mountains: [ChallengeMountainSchema],
  mountainCount: Number
});

mongoose.model("challenges", challengeSchema);
