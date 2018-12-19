import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import Field from "../../../Field";
import formFields from "./activityDetailsFields";

// import DateTimePicker from 'react-widgets/lib/DateTimePicker'
// import moment from 'moment'
// import momentLocaliser from 'react-widgets/lib/localizers/moment'
//
// import 'react-widgets/dist/css/react-widgets.css'
//
// momentLocaliser(moment)

class ActivityDetails extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type }) => {
      if (type === "Number") {
        // return <NumberPicker key={name} min={0}/>
      }
      return (
        <ReduxField
          key={name}
          name={name}
          type={type}
          label={label}
          component={Field}
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

  _.each(formFields, ({ name, required }) => {
    if (required && !values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "activityDetails",
  destroyOnUnmount: false
})(ActivityDetails);
