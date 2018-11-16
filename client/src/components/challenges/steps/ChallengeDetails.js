import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import Field from "../../Field";
import { Link } from "react-router-dom";
import formFields from "./challengeFormFields";

class ChallengeDetails extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type }) => {
      return (
        <ReduxField
          key={name}
          type={type}
          component={Field}
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFields()}
          <Link to="/challenges" className="grey btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="grey btn-flat white-text right">
            Next
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "challengeDetails",
  destroyOnUnmount: false
})(ChallengeDetails);
