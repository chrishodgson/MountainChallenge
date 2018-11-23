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
  const reviewFields = _.map(formFields, ({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
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
  return { formValues: state.form.challengeDetails.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(ChallengeReview));
