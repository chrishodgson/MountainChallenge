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
          <select {...input} className="browser-default">
            <option />
            {renderOptions()}
          </select>
        );
      case "text":
      default:
        return <input {...input} />;
    }
  };

  return (
    <div>
      <label>{label}</label>
      <div className="input-field">{renderField()}</div>
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
