import React, { Component } from "react";
import { connect } from "react-redux";

class MountainSearchResults extends Component {
  renderMountains() {
    return this.props.mountains.map(mountain => {
      return (
        <span style={{ paddingRight: "10px" }} key={mountain._id}>
          &raquo; {mountain.name} - {mountain.metres}
        </span>
      );
    });
  }
  render() {
    return (
      <div>
        <p>Mountain search results</p>
        {this.renderMountains()}
      </div>
    );
  }
}

function mapStateToProps({ mountains }) {
  return { mountains };
}

export default connect(mapStateToProps)(MountainSearchResults);
