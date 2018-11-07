const mongoose = require("mongoose");
const { Schema } = mongoose;
// const MemberSchema = require("./Member");

const challengeSchema = new Schema({
  title: String,
  created: Date
  // members: [MemberSchema],
  // mountains: [MountainSchema],
  // totalMountains: Number
  // totalMembers: Number
  // totalActivities: Number
});

mongoose.model("challenges", challengeSchema);
