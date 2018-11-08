const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainClassificationSchema = new Schema({
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain" }
});

module.exports = mountainClassificationSchema;
