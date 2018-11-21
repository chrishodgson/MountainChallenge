import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectMountain } from "../../../actions";

class ChallengeMountainList extends Component {
  // isAlreadySelected(mountainId) {
  //   const found = _.find(this.props.mountainSelection, mountain => {
  //     return mountain._id === mountainId;
  //   });
  //   return found || false;
  // }

  renderMountains() {
    return this.props.mountainSearch.map(mountain => {
      return (
        <tr key={mountain._id}>
          <td>
            {this.isAlreadySelected(mountain._id) ? (
              ""
            ) : (
              <button
                className="btn-flat grey white-text"
                name={mountain._id}
                onClick={this.handleClick}
              >
                Add
              </button>
            )}
          </td>
          <td>{mountain.name}</td>
          <td>{mountain.metres}m</td>
          <td>{mountain.area}</td>
        </tr>
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
    if (this.props.mountainSearch.length === 0) {
      return null;
    }

    return (
      <table style={{ paddingTop: "20px" }}>
        <caption>Search Results:</caption>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Height</th>
            <th>Area</th>
          </tr>
        </thead>
        <tbody>{this.renderMountains()}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ mountainSearch, mountainSelection }) {
  return { mountainSearch, mountainSelection };
}

export default connect(
  mapStateToProps,
  { selectMountain }
)(ChallengeMountainList);
