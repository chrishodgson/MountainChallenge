import React, { Component } from "react";
import { connect } from "react-redux";

class ChallengeSelectedMountainList extends Component {
  renderSelectedMountains() {
    return this.props.mountainSelection.map(mountain => {
      return (
        <span style={{ paddingRight: "10px" }} key={mountain._id}>
          ^ {mountain.name}
        </span>
      );
    });
  }

  render() {
    if (this.props.mountainSelection.length === 0) {
      return null;
    }
    return (
      <div>
        Selected Mountains: <ul>{this.renderSelectedMountains()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ mountainSelection }) {
  return { mountainSelection };
}

export default connect(mapStateToProps)(ChallengeSelectedMountainList);
