import React, { PureComponent } from "react";
// import { Table } from "antd";
import axios from "axios";
// import styled from "styled-components";
import { getDeviceCode, getToken } from "../../helper/local-storage";
import Header from "../Header/Header";
// import { Link } from "react-router-dom";
import "./profile.scss";

// const GlobalStyle = styled(Table)`
//   /* .ant-table-content {
//     height: 100%;
//     position: relative;
//     .ant-table-thead tr > th {
//       width: 200px;
//       background: red;
//       padding: 20px 10px;
//       display: flex;
//       flex-direction: column;
//     }
//     .ant-table-tbody tr > td {
//       position: absolute;
//       width: 100%;
//       top: 0;
//       bottom: 0;
//       left: 200px;
//       display: flex;
//       flex-direction: column;
//     }
//   } */
// `;

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Phone",
//     dataIndex: "phone_number",
//     key: "phone_number",
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//     key: "email",
//   },
//   {
//     title: "Gender",
//     dataIndex: "gender",
//     key: "gender",
//   },
//   {
//     title: "Account Type",
//     dataIndex: "account_type",
//     key: "account_type",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Avatar",
//     dataIndex: "avatar",
//     key: "avatar",
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (match) => (
//       <Link to={"/update"} macth={match}>
//         Edit
//       </Link>
//     ),
//   },
// ];

export class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onLoad: "",
      tableData: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const deviceCode = getDeviceCode();
    const token = "Bearer " + getToken();
    axios({
      method: "get",
      url: "https://acpstaging.vipn.net/api/auth/profile",
      headers: { "DEVICE-CODE": deviceCode, Authorization: token },
    }).then((res) => {
      this.setState({ tableData: res.data.data });
    });
  }

  render() {
    const { tableData } = this.state;
    console.log("table", tableData);

    return (
      <div>
        <Header />
        {/* <GlobalStyle columns={columns} dataSource={this.state.tableData} /> */}
        <div class="table">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Account Type</th>
            <th>Address</th>
            <th>Avatar</th>
          </tr>
          <tr class="table-data">
            <td>{tableData.name}</td>
            <td>{tableData.phone_number}</td>
            <td>{tableData.gender}</td>
            <td>{tableData.email}</td>
            <td>{tableData.account_type}</td>
            <td>{tableData.address}</td>
            <td>{tableData.avatar}</td>
          </tr>
        </div>
      </div>
    );
  }
}

export default Profile;
