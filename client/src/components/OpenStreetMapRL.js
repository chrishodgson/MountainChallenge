import React, { Component } from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet/dist/react-leaflet.min";
// const { Map: LeafletMap, TileLayer, Marker, Popup } = window.ReactLeaflet

class OpenStreetMapRL extends Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    console.log(Map.LeafletMap);
    console.log(TileLayer);
    console.log(Marker);
    console.log(Popup);
    return null;
    // const position = [this.state.lat, this.state.lng];
    // return (
    //   <LeafletMap center={position} zoom={this.state.zoom}>
    //     <TileLayer
    //       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //       url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    //     />
    //     <Marker position={position}>
    //       <Popup>
    //         A pretty CSS3 popup. <br/> Easily customizable.
    //       </Popup>
    //     </Marker>
    //   </LeafletMap>
    // );
  }
}

export default OpenStreetMapRL;
