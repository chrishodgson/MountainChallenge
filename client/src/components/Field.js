import React, { Component } from "react";

class Field extends Component {
  render() {
    // const { input, label, type, meta: { error, touched } } = this.props.
    return (
      <div>
        // {this.renderField(type, input)}
        {type==='text' ? <input {...input} style={{ marginBottom: "5px" }} />:''};
        <label>{label}</label>
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      <div>
    );
  }

  // renderField(type, input) {
  //   switch (type) {
  //     case "textarea":
  //       return <textarea {...input} className="materialize-textarea" style={{ marginBottom: "5px" }} />
  //     case "select":
  //       return <select {...input} style={{ marginBottom: "5px" }} />
  //     case "text":
  //     default:
  //         <input {...input} style={{ marginBottom: "5px" }} />
  //   }
  // }
};

export default Field;
