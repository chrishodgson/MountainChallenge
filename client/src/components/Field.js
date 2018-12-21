import "react-widgets/dist/css/react-widgets.css";
import _ from "lodash";
import React from "react";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import NumberPicker from "react-widgets/lib/NumberPicker";
import simpleNumberLocalizer from "react-widgets-simple-number";
import momentLocaliser from "react-widgets-moment";
import Moment from "moment";

Moment.locale("en");
momentLocaliser();
simpleNumberLocalizer();

export default props => {
  const {
    input,
    type,
    label,
    index,
    options,
    meta: { error, touched },
    showTime,
    minimumNumber,
    maximumNumber
  } = props;

  const renderNumberPicker = ({ onChange, value }, min, max) => {
    return (
      <NumberPicker
        onChange={onChange}
        min={min || 0}
        max={max || 99999}
        format="00"
        value={!value ? 0 : value}
      />
    );
  };

  //todo default to today
  const renderDateTimePicker = ({ onChange, value }, showTime) => {
    return (
      <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={showTime || false}
        //defaultValue={new Date(value)}
        value={!value ? null : new Date(value)}
      />
    );
  };

  const renderOptions = () => {
    return _.map(options, ({ key, label }) => {
      return (
        <option key={key} value={key}>
          {label}
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

  const radioLayout = children => {
    return (
      <div>
        {index === 0 ? renderError() : ""}
        <label>
          {children}
          <span>{label}</span>
        </label>
      </div>
    );
  };

  const renderError = () => {
    //{touched && (error && <span>{error}</span>)}
    return (
      <div className="red-text" style={{ marginBottom: "10px" }}>
        {touched && error}
      </div>
    );
  };

  const renderField = () => {
    switch (type) {
      case "number":
        return renderNumberPicker(input, minimumNumber, maximumNumber);
      case "date":
      case "datetime":
        return renderDateTimePicker(input, showTime);
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
