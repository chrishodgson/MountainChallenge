/**
 * get information from CSV about mountains in a classification
 * node scripts/classification.js --filename=absoluteFilePath.csv --classification=W
 *
 * classifications: ['D', 'Sy', 'Fel', 'B', 'W', 'WO', 'M', 'F', 'C', 'G', '5']
 * http://www.hills-database.co.uk/database_notes.html#list_of_lists
 * http://www.hills-database.co.uk/database_notes.html#classification
 */

const _ = require("lodash");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");

const columns = /(Name|Metres|Classification|Country)/;
const filenameInput = args["filename"] || null;
const classificationInput = args["classification"] || false;

let smallest = 0,
  tallest = 0,
  total = 0,
  totalUnder300m = 0,
  mountains = [],
  countries = [];

/** Run Import
 */
const doImport = async () => {
  if (!validateInputs()) {
    return;
  }
  await parseFile();

  console.log(total, "Total ");
  console.log(totalUnder300m, "Total < 300m");
  console.log(tallest, "Tallest ");
  console.log(smallest, "Smallest ");
  console.log(countries, "Countries ");
  for (const mountain of mountains) {
    console.log(mountain);
  }
};

/** Validate Inputs
 */
const validateInputs = () => {
  if (!filenameInput) {
    console.log("Error: no --filename parameter passed");
    return false;
  }
  if (!classificationInput) {
    console.log("Error: no --classification parameter passed");
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
    const mountainClassifications = item["Classification"].split(",");
    if (mountainClassifications.includes(classificationInput)) {
      total++;
      const metres = Number(item["Metres"]);
      if (metres >= 300) {
        totalUnder300m++;
      }
      if (smallest == 0 || metres < smallest) {
        smallest = metres;
      }
      if (tallest == 0 || metres > tallest) {
        tallest = metres;
      }
      if (item["Country"] && !countries.includes(item["Country"])) {
        countries.push(item["Country"]);
      }
      mountains.push(item["Country"] + ' - ' + item["Name"] + ' (' + metres +')');
    }
  }
};

doImport();
