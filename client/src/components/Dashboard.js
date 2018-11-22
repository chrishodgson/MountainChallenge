import React from "react";
import { Link } from "react-router-dom";
import ChallengeList from "./challenges/ChallengeList";

const Dashboard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Dashboard</p>
      <ChallengeList />
      <div className="fixed-action-btn1">
        <Link to="/challenges/custom" className="btn-flat grey white-text left">
          custom challenge
        </Link>
        <Link
          to="/challenges/existing"
          className="btn-flat grey white-text right"
        >
          existing challenge
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
