import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMountains } from "../../actions";

class MountainList extends Component {
  componentDidMount(props) {
    this.props.fetchMountains();
  }

  renderMountains() {
    return this.props.mountains.map(mountain => {
      return (
        <span style={{ paddingRight: "10px" }} key={mountain._id}>&raquo; {mountain.name} - {mountain.metres}</span>
      );
    });
  }
  render() {
    if (!this.props.mountains) {
      return "Loading Mountains...";
    }
    return <div>{this.renderMountains()}</div>;
  }
}

function mapStateToProps({ mountains }) {
  console.log(mountains, 'mapStateToProps - mountains');
  return { mountains };
}

export default connect(
  mapStateToProps,
  { fetchMountains }
)(MountainList);
