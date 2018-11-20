import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectMountain } from "../../../actions";

class ChallengeMountainList extends Component {
  renderMountains() {
    return this.props.mountainSearch.map(mountain => {
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
    const mountainId = e.target.name;
    const mountain = this.getMountain(mountainId);

    if (mountain && !this.isAlreadySelected(mountainId)) {
      this.props.selectMountain(mountain);
    }
  };

  getMountain(mountainId) {
    return _.find(this.props.mountainSearch, mountain => {
      return mountain._id === mountainId;
    });
  }

  isAlreadySelected(mountainId) {
    const found = _.find(this.props.mountainSelection, mountain => {
      return mountain._id === mountainId;
    });
    return found || false;
  }

  render() {
    if (!this.props.mountainSearch) {
      return null;
    }

    return <ul>{this.renderMountains()}</ul>;
  }
}

function mapStateToProps({ mountainSearch, mountainSelection }) {
  return { mountainSearch, mountainSelection };
}

export default connect(
  mapStateToProps,
  { selectMountain }
)(ChallengeMountainList);
