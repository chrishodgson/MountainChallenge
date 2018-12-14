const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainSchema = new Schema({
  dobihId: Number,
  name: String,
  easting: Number,
  northing: Number,
  metres: Number,
  gridRef: String,
  countryCode: String,
  _county: { type: Schema.Types.ObjectId, ref: "County" },
  _area: { type: Schema.Types.ObjectId, ref: "Area" },
  _mountainLists: [{ type: Schema.Types.ObjectId, ref: "MountainList" }]
});

mongoose.model("mountains", mountainSchema);
