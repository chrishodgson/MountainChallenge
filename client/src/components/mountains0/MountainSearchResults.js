import React, { Component } from "react";
import { connect } from "react-redux";

class MountainSearchResults extends Component {
  renderMountains() {
    return this.props.mountains.map(mountain => {
      return (
        <div key={mountain._id}>
          {mountain.name} - {mountain.metres}m
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <p>Mountain search results:</p>
        {this.renderMountains()}
      </div>
    );
  }
}

function mapStateToProps({ mountains }) {
  return { mountains };
}

export default connect(mapStateToProps)(MountainSearchResults);
