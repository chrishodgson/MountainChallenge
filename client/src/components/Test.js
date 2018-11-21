import React from "react";
import { Field, reduxForm } from "redux-form";

const Test = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="favoriteColor">Favorite Color</label>
      </div>
      <div className="input-field col s12">
        <Field
          name="favoriteColor"
          className="browser-default"
          component="select"
        >
          <option />
          <option value="ff0000">Red</option>
          <option value="00ff00">Green</option>
          <option value="0000ff">Blue</option>
        </Field>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "simple" // a unique identifier for this form
})(Test);
