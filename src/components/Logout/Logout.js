import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getDeviceCode } from "./../../helper/local-storage";
import { Menu } from "antd";


class Home extends Component {
  onClose = () => {
    const device_code = getDeviceCode();
    axios({
      method: "GET",
      url: "http://a.vipn.net/api/auth/logout",
      headers: { "DEVICE-CODE": device_code },
    })
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            statusLogin: -1,
          });
          localStorage.removeItem("name");
          localStorage.removeItem("time");
          localStorage.removeItem("token");
          this.props.history.push("/login");
        } else {
          this.setState({
            statusLogin: 2,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Menu.Item onClick={this.onClose}>Đăng xuất</Menu.Item>
      </div>
    );
  }
}

export default withRouter(Home);
