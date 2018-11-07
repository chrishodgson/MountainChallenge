import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChallenges } from "../actions";

class ChallengeList extends Component {
  componentDidMount(props) {
    this.props.fetchChallenges();
  }

  renderChallenges() {
    console.log(this.props.challenges, "this.props.challenges");

    return this.props.challenges.reverse().map(challenge => {
      return (
        <div key={challenge._id} class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">{challenge.title}</span>
            <p class="left">something</p>
            <p class="right">something</p>
          </div>
          <div class="card-action" />
        </div>
      );
    });
  }
  render() {
    if (!this.props.challenges) {
      return "Loading...";
    }
    return <div>{this.renderChallenges()}</div>;
  }
}

function mapStateToProps({ challenges }) {
  return { challenges };
}

export default connect(
  mapStateToProps,
  { fetchChallenges }
)(ChallengeList);
