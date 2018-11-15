import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import Field from "../Field";
import formFields from "./formFields";
import { fetchMountains } from "../../actions";

class MountainSearchForm extends Component {

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
      <form onSubmit={this.props.handleSubmit(this.props.fetchMountains)}>
        {this.renderFields()}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values["mountain"]) {
    errors['name'] = "You must provide a value for the search";
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


// renderAreas() {
//   return AREAS.map(item => {
//     return (
//       <option key={item} value={item}>
//         {item}
//       </option>
//     );
//   });
// }
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
