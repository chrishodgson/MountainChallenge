import React, { Component } from "react";
import { reduxForm } from "redux-form";
import MountainSearch from "../mountains/MountainSearchForm";
import MountainSearch from "../mountains/MountainSearchList";

class ChallengeMountains extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <MountainSearchForm />
          <MountainSearchResults />

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
