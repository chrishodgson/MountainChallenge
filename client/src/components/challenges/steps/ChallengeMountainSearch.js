import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import Field from "../../Field";
import formFields from "./mountainFormFields";
import { fetchMountains } from "../../../actions";

class ChallengeMountainSearch extends Component {
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

          <button
            onClick={this.props.onCancel}
            className="yellow btn-flat darken-3 white-text"
          >
            Back
          </button>
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

  if (!values["mountain"]) {
    errors["name"] = "You must provide a value for the search";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "challengeMountainSearch",
  destroyOnUnmount: false
})(
  connect(
    null,
    { fetchMountains }
  )(ChallengeMountainSearch)
);
