import React, { Component } from "react";
import ChallengeDetails from "./steps/ChallengeDetails";
import ChallengeMountainSearch from "./steps/ChallengeMountainSearch";
import ChallengeMountainSearchResults from "./steps/ChallengeMountainSearchResults";
import ChallengeSelectedMountains from "./steps/ChallengeSelectedMountains";
import ChallengeMountainLists from "./steps/ChallengeMountainLists";
import ChallengeMountainListSearch from "./steps/ChallengeMountainListSearch";
import ChallengeReview from "./steps/ChallengeReview";

class ChallengeNew extends Component {
  state = { step: "" };

  renderContent() {
    switch (this.state.step) {
      //step 3
      case "review":
        return (
          <ChallengeReview
            onCancel={() => this.setState({ step: "details" })}
          />
        );
      //step 2
      case "details":
        return (
          <ChallengeDetails
            onSubmit={() => this.setState({ step: "review" })}
            onCancel={() => this.setState({ step: "mountains" })}
          />
        );
      //step 1
      case "mountains":
      default:
        if (this.props.match.params.type === "custom") {
          return (
            <div>
              <ChallengeSelectedMountains />
              <ChallengeMountainSearch onSubmit={() => this.setState({ step: "details" })} />
              <ChallengeMountainSearchResults />
            </div>
          );
        } else {
          return (
            <div>
              <ChallengeMountainListSearch />
              <ChallengeMountainLists onSubmit={() => this.setState({ step: "details" })} />
            </div>  
          );
        }
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default ChallengeNew;
