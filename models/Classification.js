const mongoose = require("mongoose");
const { Schema } = mongoose;
const ClassificationMountainSchema = require("./ClassificationMountainSchema");

const classificationSchema = new Schema({
  name: String,
  mountains: [ClassificationMountainSchema],
  mountainCount: Number
});

module.exports = classificationSchema;
