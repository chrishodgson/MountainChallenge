const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeMountainSchema = new Schema({
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain" },
  ascentCount: Number
});

module.exports = challengeMountainSchema;
