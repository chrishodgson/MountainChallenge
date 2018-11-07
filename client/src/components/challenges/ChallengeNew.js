import React, { Component } from "react";
import ChallengeForm from "./ChallengeForm";
import ChallengeReview from "./ChallengeReview";
import { reduxForm } from "redux-form";

class ChallengeNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <ChallengeReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <ChallengeForm
        onChallengeSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: "challengeForm" })(ChallengeNew);
