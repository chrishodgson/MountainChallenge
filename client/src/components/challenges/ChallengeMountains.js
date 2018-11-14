import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import Field from "../Field";
import { Link } from "react-router-dom";
import MountainSearch from "../mountains/MountainSearch";

class ChallengeMountains extends Component {
  renderFields() {
    return <div>challenge mountains</div>;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFields()}

          <MountainSearch />

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

export default reduxForm({
  form: "challengeMountains",
  destroyOnUnmount: false
})(ChallengeMountains);
