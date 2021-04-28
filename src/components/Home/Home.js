import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Nav } from "./../../styles/homeStyles";
import Header from "../Header/Header";
class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Nav>
          <h1>Xin chào, {this.props.name}</h1>
        </Nav>
      </div>
    );
  }
}
export default withRouter(Home);
