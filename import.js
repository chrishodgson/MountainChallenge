/**
 * import mountains from CSV
 * node import.js --filename=absoluteFilePath.csv --report --save --country=E
 * switches: --save to save rows that don't already exist
 *           --report to report which rows exist and which do not
 *           --classification classification to import
 *           --area area to import
 *           --country country to import
 *           --mountain mountain to import
 *
 * countries
 * [ 'S', 'ES', 'M', 'W', 'E', 'C', 'I' ]
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

const csvFilePath = args["filename"] || null;
const reportItems = args["report"] || false;
const country = args["country"] || false;
const area = args["area"] || false;
const mountain = args["mountain"] || false;
const mountainPattern = new RegExp(mountain, "i");
const classification = args["classification"] || false;
const saveItems = args["save"] || false;

let existingCount = 0,
  notExistingCount = 0,
  areaKeys = {},
  countyKeys = {},
  mountainList = [];

/** Run Import
 */
const doImport = async () => {
  await parseFile();

  if (saveItems) {
    await saveAreas();
    await saveCounties();
    await saveMountains();
  }

  console.log(
    saveItems
      ? notExistingCount + " mountains created."
      : notExistingCount + " mountains do not exist in database."
  );
  console.log(existingCount + " mountains already exist in database.");

  console.log(areaKeys, 'areaKeys');
  console.log(countyKeys, 'countyKeys');
};

/** Parse file
 */
const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    csvFilePath
  );

  for (const item of jsonArray) {
    if (shouldImportItem(item)) {
      mountainList.push(item);
      if (item["Area"] && !areaKeys.hasOwnProperty(item["Area"])) {
        areaKeys[item["Area"]] = null;
      }
      if (item["County"] && !areaKeys.hasOwnProperty(item["County"])) {
        countyKeys[item["County"]] = null;
      }
    }
  }
};

/** Should Import Item
 */
const shouldImportItem = item => {
  //TODO use fixed list of classifications
  const classificationList = item["Classification"].split(",");
  if (classification && classificationList.includes(classification)) {
    return true;
  }
  if (area && area === item["Area"]) {
    return true;
  }
  if (country && country === item["Country"]) {
    return true;
  }
  if (mountain && mountainPattern.test(item["Name"])) {
    console.log(item, mountain);
    return true;
  }
};


/** Save Areas
 */
const saveAreas = async () => {
  for (const property in areaKeys) {
    let document = await Area.findOne({ name: property }).select('_id');
    if (!document) {
      document = new Area({name: property});
      await document.save();
    }
    areaKeys[property] = document._id;
    console.log(document._id, 'area _id');
  }
};

/** Save Countries
 */
const saveCounties = async () => {
  for (const property in countyKeys) {
    let document = await County.findOne({ name: property }).select('_id');
    if (!document) {
      document = new County({name: property});
      await document.save();
    }
    countyKeys[property] = document._id;
    console.log(document._id, 'county _id');
  }
};

/** Save Mountains
 */
const saveMountains = async () => {
  for (const item of mountainList) {
    const countDocuments = await Mountain.countDocuments({
      dobihId: item.Number
    });
    if (countDocuments == 0) {
      const mountain = hydrateMountain(item);
      await mountain.save();
      notExistingCount++;
      reportMountain("Not exists", item);
    } else {
      existingCount++;
      reportMountain("Exists", item);
    }
  }
};

/** Hydrate Mountain
 */
const hydrateMountain = item => {
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
    _county: countyKeys[item["County"]]
    //_mountainLists
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
