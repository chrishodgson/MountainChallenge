import React, { Component } from "react";
import gridRefToNorthingAndEasting from "./gridref";

class OSMapStatic extends Component {
  componentDidMount() {
    const OpenSpace = window.OpenSpace;
    const options = {
      resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1]
    };
    const osMap = new OpenSpace.Map(this.refs.map, options);
    // Set map centre in National Grid Eastings and Northings and select zoom level 0
    // osMap.setCenter(new OpenSpace.MapPoint(330000, 498000), 8);
    osMap.setCenter(new OpenSpace.MapPoint(326200, 497700), 5);
    const points = [
      "NY288011",
      "NY273006",
      "SD271986",
      "SD272987",
      "SD262977",
      "SD262973",
      "SD260965"
    ];
    for (var i = 0; i < points.length; i++) {
      var data = gridRefToNorthingAndEasting(points[i]);
      var pos = new OpenSpace.MapPoint(data[0], data[1]);
      var popupText =
        "number: " +
        i +
        "grid ref: " +
        points[i] +
        "northings: " +
        data[0] +
        "eastings: " +
        data[1];
      osMap.createMarker(pos, null, popupText);
      console.log(data);
    }
  }
  render() {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          width: "750px",
          height: "750px"
        }}
        ref="map"
      />
    );
  }
}

export default OSMap;
