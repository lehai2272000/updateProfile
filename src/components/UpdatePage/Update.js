import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Form, Input, Button, Upload } from "antd";
import { getDeviceCode, getToken } from "../../helper/local-storage";
import { UploadOutlined } from "@ant-design/icons";
class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      phone: "",
      gender: "",
      address: "",
      avatar: "",
    };
  }
  componentDidMount() {
    this.onUpdate();
  }

  onUpdate = () => {
    let { match } = this.props;
    console.log("match: ", match);
    const deviceCode = getDeviceCode();
    const token = "Bearer " + getToken();
    if (match) {
      let id = match.params.id;
      axios({
        method: "GET",
        url: `https://acpstaging.vipn.net/api/auth/profile/${id}`,
        headers: { "DEVICE-CODE": deviceCode, Authorization: token },
      }).then((res) => {
        let data = res.data;
        this.setState({
          id: data.id,
          name: data.name,
          phone: data.phone,
          gender: data.gender,
          address: data.address,
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
    const { id, name, phone, gender, address, avatar } = this.state;
    const deviceCode = getDeviceCode();
    const token = "Bearer" + getToken();
    // const { history } = this.props;
    e.preventDefault();
    if (id) {
      axios({
        method: "PUT",
        url: `https://acpstaging.vipn.net/api/auth/user/047fbad6-4d25-4008-84d3-53d6a94f8a66/${id}/`,
        headers: { "DEVICE-CODE": deviceCode, Authorization: token },
        data: {
          name: name,
          email: phone,
          gender: gender,
          address: address,
          avatar: avatar,
        },
      }).catch((err) => {
        console.log(err);
      });
    } else {
      axios({
        method: "POST",
        url: `https://acpstaging.vipn.net/api/auth/profile`,
        headers: { "DEVICE-CODE": deviceCode, Authorization: token },
        data: {
          name: name,
          email: phone,
          gender: gender,
          address: address,
          avatar: avatar,
        },
      });
    }
  };
  render() {
    const { name, phone, gender, address, avatar } = this.state;
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <div>
        <Form onFinish={this.onSave}>
          <Form.Item label="Name" value={name} onChange={this.onChange}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            value={phone}
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
            onChange={this.onChange}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gender" value={gender} onChange={this.onChange}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" value={address} onChange={this.onChange}>
            <Input />
          </Form.Item>
          <Form.Item label="Avatar" value={avatar} onChange={this.onChange}>
            <Upload {...props} fileList={this.state.fileList}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Button htmlType="submit">Update</Button>
        </Form>
      </div>
    );
  }
}

export default Update;
