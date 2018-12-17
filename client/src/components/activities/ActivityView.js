import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OSMap from "../OSMap";

class ActivityView extends Component {
  state = {activity: ''};

  componentDidMount(props) {
    const activity = _.find(this.props.activities, {'_id': this.props.match.params.activityId});
    if (!activity) {
      this.props.history.push("/activities");
    }
    this.setState({activity});
  }

  render() {
    const item = this.state.activity;

    console.log(this.state.activity, 'ActivityView this.state.activity');

    return (
      <div>
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
          </tbody>
        </table>
        <OSMap mountains={item._mountains} />
      </div>
    );
  }
}

function mapStateToProps({ activities }) {
  return { activities };
}

export default connect(mapStateToProps)(withRouter(ActivityView));
