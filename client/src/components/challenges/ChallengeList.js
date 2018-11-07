import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChallenges } from "../../actions";

class ChallengeList extends Component {
  componentDidMount(props) {
    this.props.fetchChallenges();
  }

  renderChallenges() {
    return this.props.challenges.reverse().map(challenge => {
      return (
        <div key={challenge._id} className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{challenge.title}</span>
            <p className="left">something</p>
            <p className="right">something</p>
          </div>
          <div className="card-action" />
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
