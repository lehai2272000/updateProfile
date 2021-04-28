import React, { Component } from "react";

class ShowAvata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
    };
  }

  render() {
    return (
      <div>
        {/* <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <div className="avatar">
                <img src={this.props.avatar} />
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-uppercase text-dark" href="#">
              {this.props.username}
            </a>
          </li>
        </ul> */}
      </div>
    );
  }
}

export default ShowAvata;
