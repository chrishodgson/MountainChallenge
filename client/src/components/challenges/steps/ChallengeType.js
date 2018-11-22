import React, { Component } from "react";
import { Link } from "react-router-dom";

const ChallengeType = () => {
  return (
    <div>
      <Link to="/challenges" className="grey btn-flat white-text">
        Cancel
      </Link>
      <Link to="/challenges" className="grey btn-flat white-text">
        Cancel
      </Link>
    </div>
  );
};

export default ChallengeType;
