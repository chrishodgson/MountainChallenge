import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OSMap from "../OSMap";

class ActivityView extends Component {
  state = { activity: "" };

  componentDidMount(props) {
    const activity = _.find(this.props.activities, {
      _id: this.props.match.params.activityId
    });
    if (!activity) {
      this.props.history.push("/activities");
    }
    this.setState({ activity });
  }

  render() {
    const activity = this.state.activity;

    if (!activity) {
      return null;
    }

    return (
      <div>
        <table style={{ marginTop: "20px" }}>
          <caption>Activity Details</caption>
          <tbody>
            <tr>
              <th>Title</th>
              <td>{activity.title}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{activity.description}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{activity.durationMinutes}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{activity.startDate}</td>
            </tr>
            <tr>
              <th>Mountain Count</th>
              <td>{activity.mountainCount}</td>
            </tr>
          </tbody>
        </table>
        <OSMap mountains={activity._mountains} />
      </div>
    );
  }
}

function mapStateToProps({ activities }) {
  return { activities };
}

export default connect(mapStateToProps)(withRouter(ActivityView));
