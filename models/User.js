const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  _challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }]
});

mongoose.model("users", userSchema);
