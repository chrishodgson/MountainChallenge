/**
 * import mountains by country from CSV
 * node import.js --filename=absoluteFilePath.csv --country=E --report --save
 * mandatory switches:
 * --country country code to import see list below
 * --filename absolute path of filename to import
 * optional switches:
 * --save to save rows that don't already exist OPTIONAL
 * --report to report which rows exist and which do not
 * --area area to import OPTIONAL
 * --mountain mountain to import OPTIONAL
 *
 * countries: [ 'S', 'ES', 'M', 'W', 'E', 'C', 'I' ]
 *
 * classifications
 * http://www.hills-database.co.uk/database_notes.html#classification
 */

const _ = require("lodash");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");

require("./models/Mountain");
require("./models/MountainList");
require("./models/County");
require("./models/Area");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const Mountain = mongoose.model("mountains");
const MountainList = mongoose.model("mountainLists");
const Area = mongoose.model("areas");
const County = mongoose.model("counties");

const columns = /(Number|Name|Metres|Feet|Area|Grid ref 10|Classification|Parent (Ma)|Map 1:25k|Country|County)/;
const classificationList = ["W", "WO"];

const filenameInput = args["filename"] || null;
const countryInput = args["country"] || false;
const areaInput = args["area"] || false;
const mountainInput = args["mountain"] || false;
const mountainPattern = new RegExp(mountainInput, "i");
const saveItems = args["save"] || false;
const reportItems = args["report"] || false;

let existingCount = 0,
  notExistingCount = 0,
  areaKeys = {},
  countyKeys = {},
  classificationKeys = {},
  mountains = [];

/** Run Import
 */
const doImport = async () => {
  if (!validateInputs()) {
    return;
  }
  await parseFile();

  if (saveItems) {
    await saveAreas();
    await saveCounties();
    await saveClassifications();
  }

  await processMountains();

  console.log(
    saveItems
      ? notExistingCount + " mountains created."
      : notExistingCount + " mountains do not exist in database."
  );
  console.log(existingCount + " mountains already exist in database.");
};

/** Validate Inputs
 */
const validateInputs = () => {
  if (!filenameInput) {
    console.log("Error: no --filename parameter passed");
    return false;
  }
  if (!countryInput) {
    console.log("Error: no --country parameter passed");
    return false;
  }
  return true;
};

/** Parse file
 */
const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    filenameInput
  );

  for (const item of jsonArray) {
    if (shouldImportRow(item)) {
      mountains.push(item);
      if (item["Area"] && !areaKeys.hasOwnProperty(item["Area"])) {
        areaKeys[item["Area"]] = null;
      }
      if (item["County"] && !areaKeys.hasOwnProperty(item["County"])) {
        countyKeys[item["County"]] = null;
      }
      for (const classification of getFilteredClassifications(item)) {
        if (!classificationKeys.hasOwnProperty(classification)) {
          classificationKeys[classification] = null;
        }
      }
    }
  }
};

/** Should Import Row
 */
const shouldImportRow = item => {
  return countryInput !== item["Country"] ||
    (areaInput && areaInput !== item["Area"]) ||
    (mountainInput && !doesMountainMatch(item))
    ? false
    : true;
};

/** Check whether mountain is a match
 */
const doesMountainMatch = item => {
  return mountainPattern.test(item["Name"]);
};

/** get filtered classifications
 */
const getFilteredClassifications = item => {
  const mountainClassifications = item["Classification"].split(",");
  let list = [];
  for (const classification of mountainClassifications) {
    if (classificationList.includes(classification)) {
      list.push(classification);
    }
  }
  return list;
};

/** Save Classifications
 */
const saveClassifications = async () => {
  for (const property in classificationKeys) {
    console.log(property, "classificationKeys property");

    let document = await MountainList.findOne({
      classificationCode: property
    }).select("_id");
    if (!document) {
      document = new MountainList({ classificationCode: property });
      await document.save();
    }
    classificationKeys[property] = document._id;
    console.log(document._id, "MountainList _id");
  }
};

/** Save Areas
 */
const saveAreas = async () => {
  for (const property in areaKeys) {
    console.log(property, "areaKeys property");

    let document = await Area.findOne({ name: property }).select("_id");
    if (!document) {
      document = new Area({ name: property });
      await document.save();
    }
    areaKeys[property] = document._id;
    console.log(document._id, "area _id");
  }
};

/** Save Countries
 */
const saveCounties = async () => {
  for (const property in countyKeys) {
    console.log(property, "countyKeys property");

    let document = await County.findOne({ name: property }).select("_id");
    if (!document) {
      document = new County({ name: property });
      await document.save();
    }
    countyKeys[property] = document._id;
    console.log(document._id, "county _id");
  }
};

/** Process Mountains
 */
const processMountains = async () => {
  for (const item of mountains) {
    const countDocuments = await Mountain.countDocuments({
      dobihId: item.Number
    });
    if (countDocuments == 0) {
      if (saveItems) {
        const mountain = hydrateMountain(item);
        await mountain.save();
      }
      notExistingCount++;
      reportMountain("Not exists", item);
      if (mountainInput && doesMountainMatch(item)) {
        console.log(item, "mountain");
      }
    } else {
      existingCount++;
      reportMountain("Exists", item);
    }
  }
};

/** Hydrate Mountain
 */
const hydrateMountain = item => {
  const mountainLists = [];
  for (const classification of getFilteredClassifications(item)) {
    mountainLists.push(classificationKeys[classification]);
  }

  return new Mountain({
    dobihId: item["Number"],
    name: item["Name"],
    lat: item["Latitude"],
    lng: item["Longitude"],
    metres: item["Metres"],
    feet: item["Feet"],
    gridRef: item["Grid ref 10"],
    countryCode: item["Country"],
    _area: areaKeys[item["Area"]],
    _county: countyKeys[item["County"]],
    _mountainLists: mountainLists
  });
};

/** Log Mountain
 */
const reportMountain = (msg, item) => {
  if (reportItems) {
    console.log(msg + " " + item.Number + " // " + item.Name);
  }
};

doImport();
