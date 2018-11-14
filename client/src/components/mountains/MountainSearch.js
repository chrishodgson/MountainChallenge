import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMountains } from "../../actions";
import MountainSearchForm from "./MountainSearchForm";
import MountainSearchResults from "./MountainSearchResults";

class MountainSearch extends Component {
  componentDidMount(props) {
    this.props.fetchMountains();
  }

  render() {
    return (
      <div>
        <p>Mountain search</p>
        <MountainSearchForm />
        <MountainSearchResults />
      </div>
    );
  }
}

export default connect(
  null,
  { fetchMountains }
)(MountainSearch);
