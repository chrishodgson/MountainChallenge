const mongoose = require("mongoose");
const { Schema } = mongoose;

const classificationMountainSchema = new Schema({
  _classification: { type: Schema.Types.ObjectId, ref: "Classification" }
});

module.exports = classificationMountainSchema;
