import React, { Component } from "react";
import gridRefToNorthingAndEasting from "./gridref";

class OSMap extends Component {
  componentDidMount() {
    const OpenSpace = window.OpenSpace;
    const options = {
      resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1]
    };
    const osMap = new OpenSpace.Map(this.refs.map, options);
    // Set map centre in National Grid Eastings and Northings and select zoom level 0
    osMap.setCenter(new OpenSpace.MapPoint(421120, 400440), 8);
    const points = [
      'se213004','se209004', 'se206004', 'se205005', 'se202006', 'se200006',
      'se198007', 'se198005', 'se198003', 'se198001', 'se199000', 'se201999', 'se203997',
      'se207995', 'se209995', 'se212996', 'se213999', 'se216001', 'se214003', 'se214004'
    ];
    for (var i = 0; i < points.length; i++) {
        var data = gridRefToNorthingAndEasting(points[i]);
        var pos = new OpenSpace.MapPoint(data[0], data[1]);
        var popupText = points[i];
        osMap.createMarker(pos, null, popupText);
      }
  }
  render() {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          width: "750px",
          height: "350px"
        }}
        ref="map"
      />
    );
  }
}

export default OSMap;
