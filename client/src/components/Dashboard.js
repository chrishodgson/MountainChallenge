import React from "react";
import { Link } from "react-router-dom";
import ChallengeList from "./challenges/ChallengeList";

const Dashboard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Dashboard</p>
      <ChallengeList />
      <div className="fixed-action-btn">
        <Link to="/challenges/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
