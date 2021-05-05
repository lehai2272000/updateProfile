import React, { Component } from "react";
import axios from "axios";
import { getDeviceCode, getToken } from "../../helper/local-storage";
class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone_number: "",
      gender: "",
      avatar: null,
    };
  }

  componentDidMount() {
    this.onUpdate();
  }

  //Update API
  onUpdate = () => {
    const deviceCode = getDeviceCode();
    const token = "Bearer " + getToken();
    axios({
      method: "GET",
      url: "https://acpstaging.vipn.net/api/auth/profile",
      headers: { "DEVICE-CODE": deviceCode, Authorization: token },
    }).then((res) => {
      let data = res.data.data;
      this.setState({
        id: data.id,
        name: data.name,
        phone: data.phone_number,
        gender: data.gender,
        avatar: data.avatar,
      });
      this.uploadFile(data.avatar);
    });
  };

  //Upload file images
  uploadFile = (pathFile) => {
    const formData = new FormData();
    formData.append("app_id", 2);
    formData.append("file", pathFile);
    axios({
      method: "POST",
      url: "https://filer.vipn.net/file/",
      data: formData,
    })
      .then((res) => {
        const result = res.data;
        this.setState({
          avatar: result.data,
        });
        console.log("image", result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSelecFile = (e) => {
    let img = e.target.files[0];
    this.uploadFile(img);
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
    const { id, name, phone, gender, avatar } = this.state;
    const deviceCode = getDeviceCode();
    const token = "Bearer " + getToken();

    e.preventDefault();
    if (id) {
      axios({
        method: "PUT",
        url: `https://acpstaging.vipn.net/api/auth/profile/update`,
        headers: { "DEVICE-CODE": deviceCode, Authorization: token },
        data: {
          name: name,
          phone: phone,
          gender: gender,
          avatar: avatar,
        },
      })
        .then((res) => {
          this.props.history.push("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    const { name, phone, gender, avatar } = this.state;
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
            <label>Avatar</label>
            <input
              type="text"
              className="form-control"
              name="avatar"
              value={avatar}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Avatar</label>
            <input type="file" name="avatar" onChange={this.onSelecFile} />
            {/* {this.state.avatar? <p>{this.state.avatar}</p>:""} */}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Update;
