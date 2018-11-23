import React, { Component } from "react";
import ChallengeDetails from "./steps/ChallengeDetails";
import ChallengeMountainSearch from "./steps/ChallengeMountainSearch";
import ChallengeMountainSearchResults from "./steps/ChallengeMountainSearchResults";
import ChallengeSelectedMountains from "./steps/ChallengeSelectedMountains";
import ChallengeMountainLists from "./steps/ChallengeMountainLists";
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
            onSubmit={() => this.setState({ step: "mountains" })}
            //onCancel={() => this.setState({ step: "type" })}
          />
        );
      //step 1
      case "mountains":
      default:
        if (this.props.match.params.type === "custom") {
          return (
            <div>
              <ChallengeSelectedMountains />
              <ChallengeMountainSearch
                onSubmit={() => this.setState({ step: "details" })}
                //onCancel={() => this.setState({ step: "details" })}
              />
              <ChallengeMountainSearchResults />;
            </div>
          );
        } else {
          return (
            <ChallengeMountainLists
              onSubmit={() => this.setState({ step: "details" })}
              // onCancel={() => this.setState({ step: "mountains" })}
            />
          );
        }
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default ChallengeNew;
