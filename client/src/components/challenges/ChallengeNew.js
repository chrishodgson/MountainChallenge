import React, { Component } from "react";
import ChallengeDetails from "./steps/ChallengeDetails";
import ChallengeMountainSearch from "./steps/ChallengeMountainSearch";
import ChallengeMountainList from "./steps/ChallengeMountainList";
import ChallengeSelectedMountainList from "./steps/ChallengeSelectedMountainList";
import ChallengeReview from "./steps/ChallengeReview";

class ChallengeNew extends Component {
  state = { step: "" };

  renderContent() {
    switch (this.state.step) {
      case "review":
        return (
          <ChallengeReview
            onCancel={() => this.setState({ step: "mountains" })}
          />
        );
      case "mountains":
        const type = this.props.match.params.type || "";
        if (type === "custom") {
          return (
            <div>
              <ChallengeSelectedMountainList />
              <ChallengeMountainSearch
                onSubmit={() => this.setState({ step: "review" })}
                onCancel={() => this.setState({ step: "details" })}
              />
              <ChallengeMountainList />
            </div>
          );
        } else {
          return <div>Select a Mountain List</div>;
        }
      case "details":
      default:
        return (
          <ChallengeDetails
            onSubmit={() => this.setState({ step: "mountains" })}
            onCancel={() => this.setState({ step: "type" })}
          />
        );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default ChallengeNew;
