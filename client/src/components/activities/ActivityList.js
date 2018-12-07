import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivities } from "../../actions";

class ActivityList extends Component {
  componentDidMount(props) {
    this.props.fetchActivities();
  }

  renderActivities() {
    return this.props.activities.reverse().map(item => {
      return (
        <tr key={item._id}>
          <td>
          link
          </td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{item.mountainCount}</td>
          <td>{item.durationMinutes}</td>
          <td>{item.startDate}</td>
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
            <th>&nbsp;</th>
            <th>Title</th>
            <th>Desc</th>
            <th>Count</th>
            <th>Duration</th>
            <th>Date</th>
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
