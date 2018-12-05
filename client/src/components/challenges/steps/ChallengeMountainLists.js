import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Field from "../../Field";
import { searchMountainLists } from "../../../actions";

class ChallengeMountainLists extends Component {
  renderFields() {
    // return _.map(mountainListSearch, mountainList => {
    //   return (
    //     <ReduxField
    //       key={rest.key || name}
    //       name={name}
    //       type={type}
    //       label={label}
    //       options={options}
    //       component={Field}
    //       value={rest.value || null}
    //     />
    //   );
    // });
  }

  render() {
    console.log(this.props.mountainListSearch, 'this.props.mountainListSearch');
    // {this.renderFields()}

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>

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

function mapStateToProps({ mountainListSearch }) {
  return { mountainListSearch };
}

function validate(values) {
  const errors = {};

  if (!values["list"]) {
    errors["list"] = "You must select a mountain list";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "ChallengeMountainLists",
  destroyOnUnmount: false
})(connect(mapStateToProps)(ChallengeMountainLists));
