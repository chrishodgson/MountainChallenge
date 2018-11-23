import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { Link } from "react-router-dom";
import Field from "../../Field";
import formFields from "./fields/challengeMountainListsFields";

class ChallengeMountainLists extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type, options, ...rest }) => {

      //console.log(rest);

      return (
        <ReduxField
          key={rest.key || name}
          name={name}
          type={type}
          label={label}
          options={options}
          component={Field}
          value={rest.value || null}
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
            Back
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

  console.log(values, 'validate values  ChallengeMountainLists');

  if (!values["list"]) {
    // errors["list"] = "You must select a list";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "ChallengeMountainLists",
  destroyOnUnmount: false
})(ChallengeMountainLists);
