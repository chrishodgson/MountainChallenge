import React, { Component } from "react";
import Details from "../../steps/challengeDetails/ChallengeDetails";
import MountainSearch from "../../steps/challengeMountains/ChallengeMountainSearch";
import MountainSearchResults from "../../steps/challengeMountains/ChallengeMountainSearchResults";
import SelectedMountains from "../../steps/challengeMountains/ChallengeSelectedMountains";
import Review from "./ChallengeNewCustomListReview";

class ChallengeNewCustomList extends Component {
  state = { step: "" };

  renderContent() {
    switch (this.state.step) {
      //step 3
      case "review":
        return <Review onCancel={() => this.setState({ step: "details" })} />;
      //step 2
      case "details":
        return (
          <Details
            onSubmit={() => this.setState({ step: "review" })}
            onCancel={() => this.setState({ step: "mountains" })}
          />
        );
      //step 1
      case "mountains":
      default:
        return (
          <div>
            <SelectedMountains />
            <MountainSearch
              onSubmit={() => this.setState({ step: "details" })}
            />
            <MountainSearchResults />
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <p>New Challenge - create your own Mountain List</p>
        {this.renderContent()}
      </div>
    );
  }
}

export default ChallengeNewCustomList;