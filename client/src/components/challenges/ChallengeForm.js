import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import Field from "../Field";
import { Link } from "react-router-dom";
import formFields from "./formFields";

class ChallengeForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <ReduxField
          key={name}
          type="text"
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
        <form onSubmit={this.props.handleSubmit(this.props.onChallengeSubmit)}>
          {this.renderFields()}
          <Link to="/challenges" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat white-text right">
            Next
            <i className="material-icons right">done</i>
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
  form: "challengeForm",
  destroyOnUnmount: false
})(ChallengeForm);
