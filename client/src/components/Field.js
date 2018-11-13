import React from "react";

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div>
      {type === "textarea" ? (
        <textarea
          {...input}
          className="materialize-textarea"
          style={{ marginBottom: "5px" }}
        />
      ) : (
        <input {...input} style={{ marginBottom: "5px" }} />
      )}
      <label>{label}</label>
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
