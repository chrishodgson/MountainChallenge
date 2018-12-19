import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities } from "../../actions";
import Moment from "moment";

class ActivityList extends Component {
  componentDidMount(props) {
    this.props.fetchActivities();
  }

  renderMountains(mountains) {
    //todo order mountains by order field
    return mountains.map(mountain => {
      return (
        <li key={mountain._id}>
          {mountain.name} {mountain.metres}m - {mountain.gridRef}
        </li>
      );
    });
  }

  renderActivities() {
    return this.props.activities.reverse().map(item => {
      return (
        <tr key={item._id}>
          <td>
            <Link to={`/activities/view/${item._id}`}>{item.title}</Link>
          </td>
          <td>{item.description}</td>
          <td>
            {item.hours || item.minutes
              ? (item.hours || 0) + " hours " + (item.minutes || 0) + " mins"
              : ""}
          </td>
          <td>{item.date ? Moment(item.date).format("MMMM Do YYYY") : ""}</td>
          <td>
            Total: {item.mountainCount} {this.renderMountains(item._mountains)}
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.props.activities.length === 0) {
      return null;
    }

    return (
      <table style={{ marginTop: "20px" }}>
        <caption>Activities</caption>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Mountains</th>
          </tr>
        </thead>
        <tbody>{this.renderActivities()}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ activities }) {
  return { activities };
}

export default connect(
  mapStateToProps,
  { fetchActivities }
)(ActivityList);
