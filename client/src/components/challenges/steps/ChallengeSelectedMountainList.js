import React, { Component } from "react";
import { connect } from "react-redux";

class ChallengeSelectedMountainList extends Component {
  renderSelectedMountains() {
    return this.props.selectedMountains.map(mountain => {
      return <li key={mountain}>{mountain}</li>;
    });
  }

  render() {
    return (
      <div>
        Selected Mountains: <ul>{this.renderSelectedMountains()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ selectedMountains }) {
  return { selectedMountains };
}

export default connect(mapStateToProps)(ChallengeSelectedMountainList);
