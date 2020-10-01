import React from "react";
import { connect } from "react-redux";

import HelmetComp from "../../Component/Helmet/index";
import ChangeUserInfor from "../ChangeUserInfor";

import "./style.css";
import { withRouter, Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
    };
  }

  render() {
    const { userName, avatarUrl, role } = this.props.user;
    const pathName = this.props.location.pathname;
    return (
      <div className="user-infor-container">
        <HelmetComp title="User" />
        <div className="user-infor">
          <div className="avatar">
            <img
              src={avatarUrl}
              alt="Cannot display"
              width="150"
              height="150"
            ></img>
          </div>
          <p className="user-name">{userName}</p>
          <p className="user-address">
            Address: Newyork city, the United State
          </p>
          <div className="edit-user-infor">
            <ChangeUserInfor />
          </div>
          {role === "User" && (
            <Link
              to={`${pathName}/shopping-history`}
              className="shopping-history-link"
            >
              Shopping History
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer,
  };
};

export default withRouter(connect(mapStateToProps, null)(User));
