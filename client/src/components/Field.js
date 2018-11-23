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
        <div className="input-field">{children}</div>
      </div>
    );
  };

  const radioLayout = children => {
    return (
      <label>
        {children}
        <span>{label}</span>
      </label>
    );
  };

  const renderField = () => {
    switch (type) {
      case "textarea":
        return defaultLayout(
          <textarea {...input} className="materialize-textarea" />
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
        return defaultLayout(<input {...input} type="text" />);
    }
  };

  return (
    <div>
      {renderField()}
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
