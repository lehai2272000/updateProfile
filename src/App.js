import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import {
  getDeviceCode,
  getName,
  getToken,
  setDeviceCode,
} from "./helper/local-storage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Update from "./components/UpdatePage/Update";
class Main extends Component {
  constructor(props) {
    super(props);
    const user = getName();
    this.state = {
      email: "",
      password: "",
      name: user ? user : "",
      isLogin: !!user,
      device_code: "",
    };
  }

  componentDidMount() {
    const device_code = getDeviceCode();
    const token = getToken();
    if (!device_code) {
      this.initDevice();
      return;
    }

    if (!token) {
      this.props.history.push("/login");
    }
  }

  initDevice = () => {
    axios({
      method: "POST",
      url: "http://a.vipn.net/api/device/init",
      body: { device_type: 2 },
    })
      .then((res) => {
        const result = res.data;
        if (result.success !== true) {
          return;
        }
        this.device_code = result.data.device_code;
        setDeviceCode(this.device_code);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // check device_code
  checkDeviceCode = () => {
    const device_code = getDeviceCode();
    return device_code;
  };

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/" exact component={Home} />
        <Route path="/header" exact component={Header} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/update" exact component={Update} />
      </Switch>
    );
  }
}

const RoutedMain = withRouter(Main);

function App() {
  return (
    <Router>
      <RoutedMain />
    </Router>
  );
}

export default App;
