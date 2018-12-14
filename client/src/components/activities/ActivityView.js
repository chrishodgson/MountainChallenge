import React, { Component } from "react";
import { connect } from "react-redux";
import OSMap from "../OSMap";

class ActivityView extends Component {
  // componentDidMount(props) {
  //   this.props.fetchActivity();
  // }

  render() {
    const item = this.props.activities[0];
    return (
      <table style={{ marginTop: "20px" }}>
        <caption>Activity Details</caption>
        <tbody>
          <tr>
            <th>Title</th>
            <td>{item.title}</td>
          </tr>
          <tr>
            <th>Desc</th>
            <td>{item.description}</td>
          </tr>
          <tr>
            <th>Count</th>
            <td>{item.mountainCount}</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{item.durationMinutes}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{item.startDate}</td>
          </tr>
          <tr>
            <th>Map</th>
            <td>
              <OSMap />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ activities }) {
  return { activities };
}

//{ fetchActivities }
export default connect(mapStateToProps)(ActivityView);
