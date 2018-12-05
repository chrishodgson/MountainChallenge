import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Field from "../../Field";

class ChallengeMountainLists extends Component {
  renderFields() {
    // return _.map(this.props.mountainListSearch, ({_id, classificationCode}) => {
    //   return (
    //     <ReduxField
    //       key={_id}
    //       name='list'
    //       type='radio'
    //       label={classificationCode}
    //       component={Field}
    //     />
    //   );
    // });

    return (
    <div>
      <ReduxField key='male' name='sex[]' type='radio' label='male' component={Field} />
      <ReduxField key='female' name='sex[]' type='radio' label='female' component={Field} />
    </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>

          {this.renderFields()}

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

// console.log(values, 'validate ChallengeMountainLists');

  if (!values["list"]) {
    errors["list"] = "You must select a Mountain List";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "ChallengeMountainLists",
  destroyOnUnmount: false
})(connect(mapStateToProps)(ChallengeMountainLists));
