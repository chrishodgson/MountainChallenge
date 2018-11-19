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
    this.props.selectMountain(e.target.name);
    console.log(e.target.name, "handleClick");
  };

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

export default connect(
  mapStateToProps,
  { selectMountain }
)(ChallengeMountainList);
