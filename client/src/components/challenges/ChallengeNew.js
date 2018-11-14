import React, { Component } from "react";
import ChallengeForm from "./ChallengeForm";
import ChallengeReview from "./ChallengeReview";
import ChallengeMountains from "./ChallengeMountains";
import { reduxForm } from "redux-form";

class ChallengeNew extends Component {
  state = { step: 0 };

  renderContent() {
    switch (this.state.step) {
      case 0:
        return <ChallengeForm onSubmit={() => this.setState({ step: 1 })} />;
      case 1:
        return (
          <ChallengeMountains
            onCancel={() => this.setState({ step: 0 })}
            onSubmit={() => this.setState({ step: 2 })}
          />
        );
      case 2:
        return <ChallengeReview onCancel={() => this.setState({ step: 1 })} />;
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: "challengeForm" })(ChallengeNew);
