import _ from "lodash";
import React from "react";

export default props => {
  const {
    input,
    type,
    label,
    options,
    meta: { error, touched }
  } = props;

  const renderOptions = () => {
    return _.map(options, option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };

  const defaultLayout = children => {
    return (
      <div>
        <label>{label}</label>
        <div
          style={{ marginBottom: "0px", marginTop: "0px" }}
          className="input-field"
        >
          {children}
        </div>
        {renderError()}
      </div>
    );
  };

  //dont show errors
  const radioLayout = children => {
    return (
      <div>
        <label>
          {children}
          <span>{label}</span>
        </label>
        {renderError()}
      </div>
    );
  };

  const renderError = () => {
    return (
      <div className="red-text" style={{ marginBottom: "10px" }}>
        {touched && error}
      </div>
    );
  };

  const renderField = () => {
    switch (type) {
      case "textarea":
        return defaultLayout(
          <textarea
            {...input}
            className="materialize-textarea"
            style={{ margin: "0px" }}
          />
        );
      case "select":
        return defaultLayout(
          <select {...input} className="browser-default">
            <option />
            {renderOptions()}
          </select>
        );
      case "radio":
        return radioLayout(<input {...input} type="radio" />);
      case "text":
      default:
        return defaultLayout(
          <input {...input} type="text" style={{ margin: "0px" }} />
        );
    }
  };

  return <div>{renderField()}</div>;
};
