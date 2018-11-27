const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeUserSchema = new Schema({
  name: String,
  admin: { type: Boolean, default: false },
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = challengeUserSchema;
