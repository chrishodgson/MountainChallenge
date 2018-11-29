/**
 * get information from CSV about mountains in a classification
 * node scripts/classification.js --filename=absoluteFilePath.csv
 */

const _ = require("lodash");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");

const columns = /(Name|Metres|Classification|Country)/;
const filenameInput = args["filename"] || null;
const classificationInput = args["classification"] || false;

let results = [];
const classificationList = [
  "D",
  "Sy",
  "Fel",
  "B",
  "W",
  "WO",
  "M",
  "F",
  "C",
  "G",
  "5"
];

/** Run Import
 */
const doImport = async () => {
  if (!filenameInput) {
    console.log("Error: no --filename parameter passed");
    return;
  }
  await parseFile();
  console.log(results);
};

/** Parse file
 */
const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    filenameInput
  );

  for (const item of jsonArray) {
    const mountainClassifications = item["Classification"].split(",");
    for (const classification of mountainClassifications) {
      if (classificationList.includes(classification)) {
        processItem(item, getResultsIndex(item));
      }
    }
  }
};

/** get Index
 */
const getResultsIndex = item => {
  for (i = 0; i < results.length; i++) {
    if (
      results[i].country == item["Country"] &&
      results[i].classification == item["Classification"]
    ) {
      return i;
    }
  }
  return addEmptyResult();
};

const addEmptyResult = () => {
  results.push({
    classification: item["Classification"],
    county: item["Country"],
    total: 0,
    totalUnder300: 0
  });
  return results.length;
};

const processItem = (item, index) => {
  const metres = Number(item["Metres"]);
  result.total++;
  if (metres < 300) {
    results[index].totalUnder300++;
  }
  if (metres < result.smallest) {
    results[index].smallestName = item["Name"];
    results[index].smallest = metres;
  }
  if (metres > result.tallest) {
    results[index].tallestName = item["Name"];
    results[index].tallest = metres;
  }
};

doImport();
