import React from "react";
import "../Style/User.css";
import ChangeUserInfor from "./ChangeUserInfor";

class User extends React.Component {
  render() {
    return (
      <div className="user-infor-container">
        <div className="user-infor">
          <div className="avatar">
            <img
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt="Can not display"
              width="150"
              height="150"
            ></img>
          </div>
          <p className="user-name">User</p>
          <p className="user-address">
            Address: Newyork city, the United State
          </p>
          <div className="edit-user-infor">
            <ChangeUserInfor />
          </div>
        </div>
      </div>
    );
  }
}

export default User;
