import React, { Component } from "react";
import Details from "../steps/activityDetails/ActivityDetails";
// import MountainSearch from "../../steps/activityMountains/ChallengeMountainSearch";
// import MountainSearchResults from "../../steps/activityMountains/ChallengeMountainSearchResults";
// import SelectedMountains from "../../steps/activityMountains/ChallengeSelectedMountains";
import Review from "./ActivityNewReview";

class ActivityNew extends Component {
  state = { step: "" };

  renderContent() {
    switch (this.state.step) {
      //step 3
      case "review":
        return <Review onCancel={() => this.setState({ step: "details" })} />;
      //step 2
      case "details":
      default:
        return (
          <Details
            onSubmit={() => this.setState({ step: "review" })}
            // onCancel={() => this.setState({ step: "mountains" })}
          />
        );
      // //step 1
      // case "mountains":
      // default:
      //   return (
      //     <div>
      //       <SelectedMountains />
      //       <MountainSearch
      //         onSubmit={() => this.setState({ step: "details" })}
      //       />
      //       <MountainSearchResults />
      //     </div>
      //   );
    }
  }

  render() {
    return (
      <div>
        <p>New Activity</p>
        {this.renderContent()}
      </div>
    );
  }
}

export default ActivityNew;
