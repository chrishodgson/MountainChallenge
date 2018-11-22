import React, { Component } from "react";
import ChallengeDetails from "./steps/ChallengeDetails";
import ChallengeMountainSearch from "./steps/ChallengeMountainSearch";
import ChallengeMountainList from "./steps/ChallengeMountainList";
import ChallengeSelectedMountainList from "./steps/ChallengeSelectedMountainList";
import ChallengeReview from "./steps/ChallengeReview";
import ChallengeType from "./steps/ChallengeType";
import { reduxForm } from "redux-form";

class ChallengeNew extends Component {
  state = { step: "" };

  renderContent() {
    switch (this.state.step) {
      case "3-review":
        return (
          <ChallengeReview
            onCancel={() => this.setState({ step: "2-mountainSearch" })}
          />
        );
      case "2-mountainSearch":
        return (
          <div>
            <ChallengeSelectedMountainList />
            <ChallengeMountainSearch
              onSubmit={() => this.setState({ step: "3-review" })}
              onCancel={() => this.setState({ step: "1-start" })}
            />
            <ChallengeMountainList />
          </div>
        );
      case "1-challengeDetails":
        return (
          <ChallengeDetails
            onSubmit={() => this.setState({ step: "2-mountainSearch" })}
            onCancel={() => this.setState({ step: "" })}
          />
        );
      default:
        return (
          <ChallengeType
            onSubmit={() => this.setState({ step: "1-challengeDetails" })}
          />
        );
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

//export default reduxForm({ form: "challengeForm" })(ChallengeNew);
export default ChallengeNew;
