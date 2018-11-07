const mongoose = require("mongoose");
const { Schema } = mongoose;
// const MemberSchema = require("./Member");

const challengeSchema = new Schema({
  title: String
  // members: [MemberSchema],
  // mountains: [MountainSchema],
  // totalMountains: Number
  // totalUsers: Number
  // totalActivities: Number
  // dateCreated: Date
});

mongoose.model("challenges", challengeSchema);
