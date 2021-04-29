import React, { Component } from "react";
import axios from "axios";
import { getDeviceCode, getToken } from "../../helper/local-storage";
class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      phone: "",
      gender: "",
      email: "",
      avatar: "",
    };
  }
  componentDidMount() {
    this.onUpdate();
  }

  onUpdate = () => {
    let { match } = this.props;
    const deviceCode = getDeviceCode();
    const token = "Bearer " + getToken();
    if (match) {
      // let id = match.params.id;
      axios({
        method: "GET",
        url: `https://acpstaging.vipn.net/api/auth/profile`,
        headers: { "DEVICE-CODE": deviceCode, Authorization: token },
      }).then((res) => {
        let data = res.data.data;
        this.setState({
          id: data.id,
          name: data.name,
          phone: data.phone,
          gender: data.gender,
          email: data.email,
          avatar: data.avatar,
        });
      });
    }
  };

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    const { id, name, phone, gender, email, avatar } = this.state;
    const deviceCode = getDeviceCode();
    const token = "Bearer" + getToken();
    
    e.preventDefault();
    if (id) {
      axios({
        method: "PUT",
        url: `https://acpstaging.vipn.net/api/auth/user/${id}`,
        headers: { "DEVICE-CODE": deviceCode, Authorization: token },
        data: {
          name: name,
          phone: phone,
          gender: gender,
          email: email,
          avatar: avatar,
        },
      }).catch((err) => {
        console.log(err);
      });
    }else{
      axios({
        method: "POST",
        url: `https://acpstaging.vipn.net/api/auth/user/${id}`,
        headers: { "DEVICE-CODE": deviceCode, Authorization: token },
        data: {
          name: name,
          phone: phone,
          gender: gender,
          email: email,
          avatar: avatar,
        },
      })
    }
  };
  render() {
    const { name, phone, gender, email, avatar } = this.state;
    // const props = {
    //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    //   onChange: this.handleChange,
    //   multiple: true,
    // };
    return (
      <div>
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="number"
              className="form-control"
              name="phone"
              value={phone}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input
              type="number"
              className="form-control"
              name="gender"
              value={gender}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Avatar</label>
            <input
              type="text"
              className="form-control"
              name="avatar"
              value={avatar}
              onChange={this.onChange}
            />
          </div>
          {/* <div className="form-group">
            <label for="myfile">Select a file:</label>
            <input type="file" name="avatar" value={avatar} />
          </div> */}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Update;
