import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { useHistory } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li
        onClick={() => {
          localStorage.removeItem("username");
          localStorage.removeItem("role");
          localStorage.removeItem("token");
          history.push("/signin");
        }}
      >
        Logout
      </li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar
          src={"https://via.placeholder.com/150x150"}
          className="gx-size-40 gx-pointer gx-mr-3"
          alt=""
        />
        <span className="gx-avatar-name">
          Hi {localStorage.getItem("username")}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
