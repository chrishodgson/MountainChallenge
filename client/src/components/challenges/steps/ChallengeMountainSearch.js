import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Field from "../../Field";
import formFields from "./fields/challengeMountainSearchFields";
import { searchMountains } from "../../../actions";

class ChallengeMountainSearch extends Component {
  state = { mountainsError: false };

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

  handleNext(e) {
    e.preventDefault();
    const mountainsError = this.props.mountainSelection.length === 0;
    this.setState({ mountainsError });
    if (mountainsError) {
      return;
    }
    this.props.onSubmit();
  }

  handleSearch(e) {
    console.log("handleSearch");
    e.preventDefault();
    this.props.searchMountains(
      this.props.formValues.mountain,
      this.props.formValues.country
    );
  }

  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            this.props.handleSubmit(this.handleSearch(e));
          }}
        >
          {this.renderFields()}

          {this.state.mountainsError ? (
            <div className="red-text">Please select at least one mountain.</div>
          ) : (
            ""
          )}

          <button type="submit" className="grey btn-flat white-text">
            Search
          </button>

          <Link to="/challenges" className="grey btn-flat white-text">
            Back
          </Link>
          <button
            onClick={e => this.handleNext(e)}
            className="grey btn-flat white-text right"
          >
            Next
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.challengeMountainSearch.values || [],
    mountainSelection: state.mountainSelection
  };
}

function validate(values) {
  const errors = {};

  if (!values["mountain"]) {
    errors["mountain"] = "You must provide a value for the search";
  }
  if (!values["country"]) {
    errors["country"] = "You must select a country";
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
