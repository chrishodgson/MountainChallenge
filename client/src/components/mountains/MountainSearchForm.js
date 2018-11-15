import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";

// const AREAS = [
//   "Northern Fells",
//   "Southern Fells",
//   "Western Fells",
//   "Eastern Fells",
//   "Far Eastern Fells"
// ];

class MountainSearchForm extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { area: "", term: "" };
  //   this.onFormSubmit = this.onFormSubmit.bind(this);
  // }
  //
  // onFormSubmit(event) {
  //   event.preventDefault();
  //   this.props.onSearchTermChange(this.state.term);
  // }

  renderAreas() {
    return AREAS.map(item => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  }

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
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>

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

        // <ReduxField
        //   type={type}
        //   component={Field}
        //   label={label}
        //   placeholder="Search by Mountain name"
        //   name="mountain"
        // />
        // <input
        //   name="mountain"
        //   placeholder="Search by Mountain name"
        //   value={this.state.term}
        //   onChange={event => this.setState({ term: event.target.value })}
        // />
        //
        // <select
        //   name="areas"
        //   onChange={event => this.setState({ area: event.target.value })}
        //   value={this.state.area}
        // >
        //   {this.renderAreas()}
        // </select>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values["mountain"]) {
    errors[name] = "You must provide a value for the search";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "mountainSearchForm",
  destroyOnUnmount: false
})(
  connect(
    null,
    { fetchMountains }
  )(MountainSearchForm)
);
