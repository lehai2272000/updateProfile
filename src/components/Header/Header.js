import React, { Component } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { PageHeader, Tag, Button, Avatar, Menu } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Logout from "../Logout/Logout";

const { SubMenu } = Menu;

// const styleMenu = styled(Menu)`
//   .ant-menu-submenu {
//     display: flex;
//     align-items: center;
//     overflow: hidden;
//   }
// `;

const HeaderStyle = styled(PageHeader)`
  .ant-page-header {
    background: #000;
  }
  .ant-page-header-heading-title {
    color: #000;
  }
  .ant-page-header-heading-left {
    display: flex;
    flex-direction: row-reverse;
  }
  .ant-tag {
    width: 30px;
    height: 30px;
    border: 1px;
    padding: 5px;
    font-weight: bold;
    text-align: center;
    border-radius: 50%;
  }
  .ant-tag-yellow {
    background: #ffcc00;
    color: #fff;
  }
  .ant-tag-blue {
    background: green;
    color: #fff;
  }
  .ant-tag-green {
    background: green;
    color: #fff;
  }
  .ant-tag-has-color {
    background: #ffcc00;
  }
  .ant-btn {
    border-radius: 0.8rem;
    padding: 5px 20px;
    font-weight: bold;
    background: #01dfd7;
  }
  .ant-typography {
    color: #fff;
    font-weight: bold;
    font-size: 1.5em;
  }
  .ant-page-header-heading-title {
    color: #fff;
  }
  .ant-menu-submenu{
    display: flex;
    flex-direction: column;
  }
`;

class Header extends Component {
  render() {
    return (
      <div>
        <HeaderStyle
          tags={
            <Menu>
              <SubMenu title={<Avatar size="larger" icon={<UserOutlined />} />}>
                {/* <Menu.Item> <Link to={`/update/${tableData.id}`}>Update</Link></Menu.Item> */}
                <Menu.Item><Logout/></Menu.Item>
              </SubMenu>
            </Menu>
          }
          extra={[
            <Tag color="green">DP</Tag>,
            <Tag color="vang">ML</Tag>,
            <Tag color="yellow">ML</Tag>,
            <Button type="primary">
              <Link to="/">HOME</Link>
            </Button>,
            <Button type="primary">
              <Link to="/profile">PROFILE</Link>
            </Button>,
          ]}
        ></HeaderStyle>
      </div>
    );
  }
}

export default Header;
