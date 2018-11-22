import _ from "lodash";
import React from "react";

export default ({ input, type, label, options, meta: { error, touched } }) => {
  const renderOptions = () => {
    return _.map(options, option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };

  const renderField = () => {
    switch (type) {
      case "textarea":
        return <textarea {...input} className="materialize-textarea" />;
      case "select":
        return (
          <label>{label}</label>
          <select {...input} className="browser-default">
            <option />
            {renderOptions()}
          </select>
        );
      case "radio":
        return <input type="radio" {...input} />;
      case "text":
      default:
        return
          <label>{label}</label>
          <div className="input-field"><input type="text" {...input} /></div>;
    }
  };


  return (
    <div>
      <label>
        {renderField()}
        <span>{label}</span>
      </label>
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
