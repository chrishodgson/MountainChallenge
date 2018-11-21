import React from "react";

export default ({ input, type, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      {type === "text" ? (
        <input {...input} style={{ marginBottom: "5px" }} />
      ) : (
        <textarea
          {...input}
          className="materialize-textarea"
          style={{ marginBottom: "5px" }}
        />
      )}
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
