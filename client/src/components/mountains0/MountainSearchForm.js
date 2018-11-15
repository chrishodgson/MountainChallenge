import React, { Component } from "react";
//import {bindActionCreators} from 'redux';

class MountainSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  render() {
    return (
      <p>
        <input
          value={this.state.term}
          placeholder="Search on Mountain Name"
          onChange={event => {
            this.setState({ term: event.target.value });
            this.props.onSearchTermChange(event.target.value);
          }}
        />
      </p>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({fetchWeather}, dispatch);
// }

export default MountainSearchForm;
// export default connect(null, mapDispatchToProps)(MountainSearchForm);
