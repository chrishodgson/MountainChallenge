import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectMountain } from "../../../actions";

class ChallengeMountainList extends Component {
  renderMountains() {
    return this.props.mountains.map(mountain => {
      return (
        <li key={mountain._id}>
          <button
            className="btn-flat"
            name={mountain._id}
            onClick={this.handleClick}
          >
            {mountain.name} - {mountain.metres}m
          </button>
        </li>
      );
    });
  }

  handleClick = e => {
    e.preventDefault();
    if(_.indexOf(this.props.selectedMountainIds, e.target.name) === -1) {
      this.props.selectMountain(e.target.name);
    }
  };

  render() {
    if (!this.props.mountains) {
      return null;
    }

    return <ul>{this.renderMountains()}</ul>;
  }
}

function mapStateToProps({ mountains, selectedMountainIds }) {
  return { mountains, selectedMountainIds };
}

export default connect(
  mapStateToProps,
  { selectMountain }
)(ChallengeMountainList);
