import React, { Component } from "react";

class OSMap extends Component {
  componentDidMount() {
    const OpenSpace = window.OpenSpace;
    const options = {
      resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1]
    };
    const osMap = new OpenSpace.Map(this.refs.map, options);
    // Set map centre in National Grid Eastings and Northings and select zoom level 0
    osMap.setCenter(new OpenSpace.MapPoint(421120, 400440), 8);
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
