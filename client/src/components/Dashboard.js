import React from "react";
import { Link } from "react-router-dom";
import ChallengeList from "./challenges/ChallengeList";

const Dashboard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Dashboard</p>
      <ChallengeList />
      <div className="fixed-action-btn">
        <Link to="/challenges/new" className="btn-flat grey white-text">
          New challenge
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
