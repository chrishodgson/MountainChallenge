import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { Link } from "react-router-dom";
import Field from "../../Field";

class ChallengeType extends Component {
    render() {
      return (
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <ReduxField key="custom" type="radio" component={Field} label="Build your custom list" name="list" />
          <ReduxField key="existing" type="radio" component={Field} label="Select an existing list" name="list" />
          <Link to="/challenges" className="grey btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="grey btn-flat white-text right">
            Next
          </button>
        </form>
      );
    }
};

export default reduxForm({
  form: "challengeType",
  destroyOnUnmount: false
})(ChallengeType);
