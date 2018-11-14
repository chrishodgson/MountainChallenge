import React from "react";

const MountainSearchForm = props => {
  return (
    <p>
      <input
        className=""
        placeholder="Search on Mountain Name"
        onChange={event => props.onSearchTermChange(event.target.value)}
      />
    </p>
  );
};

export default MountainSearchForm;
