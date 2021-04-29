import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  getDeviceCode,
  setName,
  setLoggedInTime,
  setToken,
  getToken,
} from './../../helper/local-storage';

class Login extends Component {
  componentDidMount() {
    const token = getToken();
    if (typeof token === 'string' && token.length > 0) {
      this.props.history.push('/');
    }
  }

  onLogin = (event) => {
    //Chặn sự kiện submit mặc định của form khi nhấn buttom
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const device_code = getDeviceCode();
    //Gọi API đăng nhập
    axios({
      method: 'post',
      url: 'http://a.vipn.net/api/auth/login',
      headers: { 'DEVICE-CODE': device_code },
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.code === 200) {
          setName(res.data.data.user.email);
          setToken(res.data.data.token);
          setLoggedInTime(res.data.data.user.last_login.date);
          console.log('push');
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form className="form-group" onSubmit={this.onLogin}>
          <input
            type="text"
            value="lengochai990099@gmail.com"
            placeholder="Nhập tài khoản"
            name="email"
          />
          <br />
          <input
            type="password"
            value="abc123456"
            placeholder="Nhập mật khẩu"
            name="password"
          />
          <br />
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
