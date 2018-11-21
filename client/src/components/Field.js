import React from "react";

export default ({ input, type, label, options, meta: { error, touched } }) => {
  // if (type === "select") {
  //   console.log(options);
  //   console.log(rest);
  // }

  // renderOptions(options) {
  //   return _.map(options, option => {
  //     return (
  //       <option key={option} value={option}>
  //         {option}
  //       </option>
  //     );
  //   });
  // }

  const field = () => {
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
        return (
          <select
            {...input}
            className="browser-default"
            style={{ marginBottom: "5px" }}
          >
            <option />
            {options}
          </select>
        );
      case "text":
      default:
        return <input {...input} style={{ marginBottom: "5px" }} />;
    }
  };

  return (
    <div>
      <label>{label}</label>
      <div className="input-field">{field()}</div>
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
