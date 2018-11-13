import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import Field from "../Field";
import { Link } from "react-router-dom";
import formFields from "./formFields";

class MountainSelector extends Component {
  renderFields() {
    return null;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
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

export default reduxForm({
  form: "MountainSelector",
  destroyOnUnmount: false
})(MountainSelector);
