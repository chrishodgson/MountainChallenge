import React, { Component } from "react";

class OSMap extends Component {
  componentDidMount() {
    console.log(this.props, "this.props");
    const OpenSpace = window.OpenSpace;
    const options = {
      resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1]
    };
    const osMap = new OpenSpace.Map(this.refs.map, options);

    //get map centre
    let eastingCentre = 0;
    let northingCentre = 0;
    for (const item of this.props.mountains) {
      eastingCentre += item.easting;
      northingCentre += item.northing;
    }
    eastingCentre = eastingCentre / this.props.mountains.length;
    northingCentre = northingCentre / this.props.mountains.length;
    osMap.setCenter(new OpenSpace.MapPoint(eastingCentre, northingCentre), 5);

    //add map markers
    for (const item of this.props.mountains) {
      const point = new OpenSpace.MapPoint(item.easting, item.northing);
      const popupText = item.name + " " + item.metres + "m - " + item.gridRef;
      osMap.createMarker(point, null, popupText);
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
