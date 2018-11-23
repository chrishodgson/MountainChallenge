import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import Field from "../../Field";
import formFields from "./fields/challengeMountainListsFields";

class ChallengeMountainLists extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type, options }) => {
      return (
        <ReduxField
          key={name}
          type={type}
          component={Field}
          label={label}
          name={name}
          options={options}
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
            className="grey btn-flat white-text"
          >
            Back
          </button>
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

  if (!values["list"]) {
    errors["list"] = "You must select a list";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "ChallengeMountainLists",
  destroyOnUnmount: false
})(ChallengeMountainLists);
