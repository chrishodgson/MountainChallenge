import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

const Header = () => <p>Header</p>;
const Landing = () => <p>Landing</p>;
const Dashboard = () => <p>Dashboard</p>;
const ChallengeNew = () => <p>ChallengeNew</p>;

// import Header from "./Header";
// import Landing from "./Landing";
// import Dashboard from "./Dashboard";
// import ChallengenNew from "./campaigns/ChallengeNew";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/challenges" component={Dashboard} />
            <Route path="/challenges/new" component={ChallengeNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
