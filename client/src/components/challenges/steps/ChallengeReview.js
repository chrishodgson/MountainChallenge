import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../actions";
import formFields from "./fields/challengeDetailsFields";

const ChallengeReview = ({
  onCancel,
  formValues,
  submitChallenge,
  history
}) => {
  // const renderDetails = _.map(
  //   this.props.challengeDetails,
  //   ({ label, name }) => {
  //     return (
  //       <div key={name}>
  //         <label>{label}</label>
  //         <div>{formValues[name]}</div>
  //       </div>
  //     );
  //   }
  // );

  // const renderMountains = _.map(mountains, ({ label, name }) => {
  //   return (
  //     <div key={name}>
  //       <label>{label}</label>
  //       <div>{formValues[name]}</div>
  //     </div>
  //   );
  // });

  // const renderMountainLists = _.map(mountainList, ({ label, name }) => {
  //   return (
  //     <div key={name}>
  //       <label>{label}</label>
  //       <div>{formValues[name]}</div>
  //     </div>
  //   );
  // });

  // {renderMountains}
  // {renderMountainLists}
  // {renderDetails}

  console.log(
    this.props.challengeDetails,
    "review component - challengeDetails"
  );
  console.log(this.props.mountainList, "review component - MountainList");
  console.log(this.props.mountains, "review component - mountains");

  return (
    <div>
      <h5>Please confirm your entries</h5>

      <button className="grey btn-flat white-text" onClick={onCancel}>
        Back
      </button>
      <button
        className="grey btn-flat white-text right"
        onClick={() => submitChallenge(formValues, history)}
      >
        Save
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    challengeDetails: state.form.challengeDetails.values,
    mountainList: state.form.ChallengeMountainLists,
    mountains: state.mountainSelection
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(ChallengeReview));
