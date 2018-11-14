import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMountains } from "../../actions";
import MountainSearchForm from "./MountainSearchForm";
import MountainSearchResults from "./MountainSearchResults";

class MountainSearch extends Component {
  render() {
    const searchTermChange = _.debounce(term => this.props.fetchMountains(term), 750);

    return (
      <div>
        <p>Mountain search</p>
        <MountainSearchForm onSearchTermChange={searchTermChange} />
        <MountainSearchResults />
      </div>
    );
  }
}

export default connect(
  null,
  { fetchMountains }
)(MountainSearch);
