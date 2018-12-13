var osMap, markersfile;

// This function creates the map and is called by the div in the HTML

function init() {
  // Create new map

  osMap = new OpenSpace.Map("map");

  // Set map centre in National Grid Eastings and Northings and select zoom level 3

  osMap.setCenter(new OpenSpace.MapPoint(400000, 400000), 3);

  // Define where the markers file is

  var markersFile = "/res/mymarkers.txt";

  // Load the markers file

  OpenLayers.loadURL(markersFile, null, this, parseFile, onFail);
}

// This function parses through the text file to create the markers

function parseFile(result) {
  var text = result.responseText;

  // Split the file by line

  var lines = text.split("\n");

  /* Cycle through each line and split it by comma into columns then if there are exactly 3 resulting columns, pass the first one to the x variable, the second to the y variable. Create the marker position from these then add the popup text from the last column. Finally create the marker */

  for (var i = 0; i < lines.length; i++) {
    var columns = lines[i].split(",");
    if (columns.length == 3) {
      var x = parseFloat(columns[0]);
      var y = parseFloat(columns[1]);
      var pos = new OpenSpace.MapPoint(x, y);
      var popupText = columns[2];

      osMap.createMarker(pos, null, popupText);

      // Create clustering so markers near each other are given one numbered marker

      clusterControl = new OpenSpace.Control.ClusterManager();
      osMap.addControl(clusterControl);
      clusterControl.activate();
    }
  }
}

// This function creates an alert if the markers file fails to load

function onFail(e) {
  alert("Cannot load markers file");
}
