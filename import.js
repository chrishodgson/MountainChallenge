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
  areaList = [],
  countyList = [],
  mountainList = [];

/** Run Import
 */
const doImport = async () => {
  await parseFile();

  if (saveItems) {
    await saveAreas();
    await saveCounties();
    await saveItems();
  }

  console.log(
    saveItems
      ? notExistingCount + " mountains created."
      : notExistingCount + " mountains not found in database (not created)."
  );
  console.log(existingCount + " mountains already exist in database.");
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
      if (item["Area"] && areaList.indexOf(item["Area"]) == -1) {
        areaList.push(item["Area"]);
      }
      if (item["County"] && countyList.indexOf(item["County"]) == -1) {
        countyList.push(item["County"]);
      }
    }
  }
};

/** Should Import Item
 */
const shouldImportItem = item => {
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
    return true;
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
    area: item["Area"], //ie Lake District - Northern Fells
    gridRef: item["Grid ref 10"]
  });
};

/** Hydrate Area
 */
const hydrateArea = item => {
  return new Area({
    name: item["Area"]
  });
};

/** Hydrate County
 */
const hydrateCounty = item => {
  return new County({
    name: item["County"]
  });
};

/** Save Areas
 */
const saveAreas = async () => {
  for (const item of countyList) {
    const countDocuments = await Area.countDocuments({ name: item });
    if (countDocuments == 0) {
      const area = hydrateArea(item);
      await area.save();
    }
  }
};

/** Save Countries
 */
const saveCounties = async () => {
  for (const item of countyList) {
    const countDocuments = await County.countDocuments({ name: item });
    if (countDocuments == 0) {
      const county = hydrateCounty(item);
      await county.save();
    }
  }
};

/** Save Items
 */
const saveItems = async () => {
  for (const item of itemList) {
    const countDocuments = await Mountain.countDocuments({
      dobihId: item.Number
    });
    if (countDocuments == 0) {
      const mountain = hydrateMountain(item);
      await mountain.save();
      notExistingCount++;
      logitem("Not exists", item);
    } else {
      existingCount++;
      logitem("Exists", item);
    }
  }
};

/** Log Item
 */
const logItem = (msg, item) => {
  if (reportItems) {
    console.log(msg + " " + item.Number + " // " + item.Name);
  }
};

doImport();
