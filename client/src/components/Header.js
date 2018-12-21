import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a className="grey-text" href="/auth/google">
              Login with Google
            </a>
          </li>
        );
      default:
        return [
          <li key="1">
            <a className="grey-text" href="/api/logout">
              Logout - {this.props.auth.name}
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            className="left brand-logo grey-text"
          >
            MC
          </Link>
          <ul className="nav justify-content-end">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
