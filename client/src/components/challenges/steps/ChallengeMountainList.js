import React, { Component } from "react";
import { connect } from "react-redux";

class ChallengeMountainList extends Component {
  renderMountains() {
    return this.props.mountains.map(mountain => {
      return (
        <li style={{'paddingTop': '10px'}} key={mountain._id}>
          {mountain.name} - {mountain.metres}m
        </li>
      );
    });
  }
  render() {
    if (!this.props.mountains) {
      return null;
    }

    return <ul>{this.renderMountains()}</ul>;
  }
}

function mapStateToProps({ mountains }) {
  return { mountains };
}

export default connect(mapStateToProps)(ChallengeMountainList);
