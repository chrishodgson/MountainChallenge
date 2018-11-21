import React, { Component } from "react";

class Field extends Component {
  renderField(type, input) {
    switch (type) {
      case "textarea":
        return (
          <textarea
            {...input}
            className="materialize-textarea"
            style={{ marginBottom: "5px" }}
          />
        );
      case "select":
        return <select {...input} style={{ marginBottom: "5px" }} />;
      case "text":
      default:
        return <input {...input} style={{ marginBottom: "5px" }} />;
    }
  }

  render() {
    const {
      input,
      type,
      label,
      meta: { error, touched }
    } = this.props.return(
      <div>
        {this.renderField(type, input)}
        <label>{label}</label>
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  }
}

export default Field;
