const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeUserSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  admin: { type: Boolean, default: false }
});

module.exports = challengeUserSchema;
