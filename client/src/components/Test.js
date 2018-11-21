import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
//import { connect } from "react-redux";

class Test extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit()}>
          <Field name="favoriteColor" component="select">
            <option></option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
          <button type="submit" className="grey btn-flat white-text right">
            Next
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({form: "test"});
