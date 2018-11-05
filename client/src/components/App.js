import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

const Header = () => <h2>Header</h2>;
// const Landing = "Landing";
// const Dashboard = "Dashboard";
// const CampaignNew = "CampaignNew";

// import Header from "./Header";
// import Landing from "./Landing";
// import Dashboard from "./Dashboard";
// import CampaignNew from "./campaigns/CampaignNew";

class App extends Component {
  componentDidMount() {
    //this.props.fetchUser();
  }

  // <Route exact path="/" component={Landing} />
  // <Route exact path="/campaigns" component={Dashboard} />
  // <Route path="/campaigns/new" component={CampaignNew} />

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
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
