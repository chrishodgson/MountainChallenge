import React, { Component } from "react";

class OSMap extends Component {
  componentDidMount() {
    const OpenSpace = window.OpenSpace;
    const osMap = new OpenSpace.Map("map");
    // Set map centre in National Grid Eastings and Northings and select zoom level 0
    osMap.setCenter(new OpenSpace.MapPoint(400000, 400000), 0);
  }
  render() {
    return <div ref="map" />;
  }
}

export default OSMap;
