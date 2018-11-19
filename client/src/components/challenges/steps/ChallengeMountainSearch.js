import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import Field from "../../Field";
import formFields from "./mountainFormFields";
import { searchMountains } from "../../../actions";

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
            className="grey btn-flat white-text"
            onClick={e => {
              e.preventDefault();
              this.props.searchMountains(this.props.formValues.mountain);
            }}
          >
            Search
          </button>

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

function mapStateToProps(state) {
  return { formValues: state.form.challengeMountainSearch.values || [] };
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
    mapStateToProps,
    { searchMountains }
  )(ChallengeMountainSearch)
);
