import React, { Component } from "react";
import { connect } from "react-redux";
import {getSelectedMountains} from "../../../selectors";

class ChallengeSelectedMountainList extends Component {
  renderSelectedMountains() {
    return this.props.mountains.map(mountain => {
      return <span style={{paddingRight: '10px'}} key={mountain._id}>{mountain.name}</span>;
    });
  }

  render() {
    if (this.props.mountains.length === 0) {
      return null;
    }
    return (
      <div>
        Selected Mountains: <ul>{this.renderSelectedMountains()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { mountains: getSelectedMountains(state) };
};

export default connect(mapStateToProps)(ChallengeSelectedMountainList);
