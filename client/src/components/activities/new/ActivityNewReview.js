import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { submitActivity } from "../../../actions";
import activityDetailFields from "../steps/activityDetails/activityDetailsFields";

class ActivityReview extends Component {
  renderActivityDetails = () =>
    _.map(activityDetailFields, ({ label, name }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{this.props.activityDetails[name]}</div>
        </div>
      );
    });

  renderMountains = () =>
    _.map(this.props.mountains, ({ _id, name }) => {
      return <div key={_id}>{name}</div>;
    });

  render() {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        {this.renderActivityDetails()}
        <p>Mountains</p>
        {this.renderMountains()}
        <button
          className="grey btn-flat white-text"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <button
          className="grey btn-flat white-text right"
          onClick={() =>
            this.props.submitActivity(
              this.props.activityDetails,
              this.props.mountains,
              this.props.history
            )
          }
        >
          Save
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activityDetails: state.form.activityDetails.values || [],
    mountains: state.mountainSelection || []
  };
}

export default connect(
  mapStateToProps,
  { submitActivity }
)(withRouter(ActivityReview));
