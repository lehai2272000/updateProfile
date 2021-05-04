import React, { PureComponent } from "react";
import axios from "axios";
import { getDeviceCode, getToken } from "../../helper/local-storage";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
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
    return (
      <div>
        <Header />
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Name</th> 
                {/* <th>Phone</th> */}
                <th>Gender</th>
                <th>Email</th>
                <th>Account Type</th>
                {/* <th>Address</th> */}
                <th>Avatar</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-data">
                <td>{tableData ? tableData.name : ""}</td>
                {/* <td>{tableData ? tableData.phone_number : ""}</td> */}
                <td>{tableData ? tableData.gender : ""}</td>
                <td>{tableData ? tableData.email : ""}</td>
                <td>{tableData ? tableData.account_type : ""}</td>
                {/* <td>{tableData ? tableData.address : ""}</td> */}
                <td>{tableData ? tableData.avatar : ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="update-table">
          <Link to={`/update/${tableData.id}`}>Update</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
