import React, { Component } from "react";
import { connect } from "react-redux";

class ChallengeMountainList extends Component {
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
    return <div>{this.renderMountains()}</div>;
  }
}

function mapStateToProps({ mountains }) {
  return { mountains };
}

export default connect(mapStateToProps)(ChallengeMountainList);
