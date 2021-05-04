import React, { Component } from "react";
import axios from "axios";
class UpdateImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
    };
  }
  componentDidMount() {
    this.uploadFile();
  }

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
        console.log("image", result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (e) => {
    let img = e.target.files[0];
    this.uploadFile(img);
  };

  render() {
    return (
      <div>
        <input type="file" accept="image/*" onChange={this.onChange} />
      </div>
    );
  }
}

export default UpdateImage;
