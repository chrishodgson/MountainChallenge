/**
 * import mountains by country from CSV
 * node scripts/import.js --filename=absoluteFilePath.csv --country=E
 *
 * mandatory switches:
 * --country country code to import see list below
 * --filename absolute path of filename to import
 *
 * countries: [ 'S', 'ES', 'M', 'W', 'E', 'C', 'I' ]
 * classifications: ['D', 'Sy', 'Fel', 'B', 'W', 'WO', 'M', 'F', 'C', 'G', '5']
 * Donald D
 * Synge Sy
 * Fellranger Fel
 * Birkett B
 * Wainwright W
 * Wainwright Outlying Fell WO
 * Munro M
 * Furth F
 * Corbett C
 * Graham G
 * Dodd 5
 * http://www.hills-database.co.uk/database_notes.html#list_of_lists
 * http://www.hills-database.co.uk/database_notes.html#classification
 */

const _ = require("lodash");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");

require("../models/Mountain");
require("../models/MountainList");
require("../models/County");
require("../models/Area");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const Mountain = mongoose.model("mountains");
const MountainList = mongoose.model("mountainLists");
const Area = mongoose.model("areas");
const County = mongoose.model("counties");

const columns = /(Number|Name|Metres|Feet|Area|Grid ref 10|Classification|Parent (Ma)|Map 1:25k|Country|County)/;
const allowedClassifications = "D,Sy,Fel,B,W,WO,M,F,C,G,5";
const classificationList = allowedClassifications.split(",");

const filenameInput = args["filename"] || null;
const countryInput = args["country"] || false;

let areaKeys = {},
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
  await saveAreas();
  await saveCounties();
  await saveMountainLists();
  await processMountains();
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
    if (countryInput == item["Country"]) {
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

/** get filtered classifications
 */
const getFilteredClassifications = item => {
  let list = [];
  const mountainClassifications = item["Classification"].split(",");
  for (const classification of mountainClassifications) {
    if (classificationList.includes(classification)) {
      list.push(classification);
    }
  }
  return list;
};

/** Save MountainLists
 */
const saveMountainLists = async () => {
  let created = 0;
  for (const property in classificationKeys) {
    let document = await MountainList.findOne({
      classificationCode: property,
      countryCode: countryInput
    }).select("_id");
    if (!document) {
      document = new MountainList({
        classificationCode: property,
        countryCode: countryInput,
        name: countryInput + ' ' + property
      });
      await document.save();
      created++;
    }
    classificationKeys[property] = document._id;
  }
  if (created > 0) {
    console.log(created + " MountainLists created.");
  }
};

/** Save Areas
 */
const saveAreas = async () => {
  let created = 0;
  for (const property in areaKeys) {
    let document = await Area.findOne({ name: property });
    if (!document) {
      document = new Area({ name: property, countryCodes: [countryInput] });
      await document.save();
      created++;
    } else if (
      !document["countryCodes"] ||
      !document["countryCodes"].includes(countryInput)
    ) {
      document["countryCodes"].push(countryInput);
      await document.save();
    }
    areaKeys[property] = document._id;
  }
  if (created > 0) {
    console.log(created + " Areas created.");
  }
};

/** Save Countries
 */
const saveCounties = async () => {
  let created = 0;
  for (const property in countyKeys) {
    let document = await County.findOne({
      name: property,
      countryCode: countryInput
    }).select("_id");
    if (!document) {
      document = new County({ name: property, countryCode: countryInput });
      await document.save();
      created++;
    }
    countyKeys[property] = document._id;
  }
  if (created > 0) {
    console.log(created + " Counties created.");
  }
};

/** Process Mountains
 */
const processMountains = async () => {
  existing = notExisting = 0;
  for (const item of mountains) {
    const countDocuments = await Mountain.countDocuments({
      dobihId: item.Number
    });
    if (countDocuments == 0) {
      const mountain = hydrateMountain(item);
      await mountain.save();
      notExisting++;
    } else {
      existing++;
    }
  }
  console.log(notExisting + " mountains created.");
  console.log(existing + " mountains already exist in database.");
};

/** Hydrate Mountain
 */
const hydrateMountain = item => {
  const mountainLists = [];
  for (const classification of getFilteredClassifications(item)) {
    mountainLists.push(classificationKeys[classification]);
  }

  return new Mountain({
    dobihId: Number(item["Number"]),
    name: item["Name"],
    lat: item["Latitude"],
    lng: item["Longitude"],
    metres: Number(item["Metres"]),
    feet: Number(item["Feet"]),
    gridRef: item["Grid ref 10"],
    countryCode: item["Country"],
    _area: areaKeys[item["Area"]],
    _county: countyKeys[item["County"]],
    _mountainLists: mountainLists
  });
};

doImport();
