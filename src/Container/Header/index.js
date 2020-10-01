import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import ShoppingItemList from "../ShoppingItemList/index";
import { HandlePopUp, LogOut } from "../../redux/action";

class Header extends React.Component {
  handlePopUp = () => {
    this.props.handlePopUp();
  };

  logOut = async () => {
    localStorage.removeItem("token");
    await this.props.logOut();
    this.props.history.push("/login");
  };

  render() {
    const { shoppingList, isPopUp } = this.props.shoppingItemList;
    const tempList = [];
    if (shoppingList.length) {
      shoppingList.forEach((element) => {
        const { id, count } = element;
        const selectedProduct = {
          id,
          count,
        };
        tempList.push(selectedProduct);
      });

      localStorage.setItem("shoppingList", JSON.stringify(tempList));
    } else {
      localStorage.removeItem("shoppingList");
    }

    const { isLogin, userName, userId } = this.props.user;
    return (
      <div className="header">
        <div>
          <Link to="/" className="header-logo"></Link>
        </div>
        <div className="header-menu">
          <div className="header-menu-product">
            <Link to="/" className="menu-link">
              Home
            </Link>
            <Link to="#" className="menu-link">
              Categories
            </Link>
            <Link to="#" className="menu-link">
              New products
            </Link>
            <Link to="#" className="menu-link">
              Sub categories
            </Link>
          </div>
          <div className="header-user">
            {!isLogin ? (
              <>
                <div className="login">
                  <Link to="/login" className="menu-link">
                    Login
                  </Link>
                  <div className="login-icon"></div>
                </div>
                <div className="signup">
                  <Link to="/signup" className="menu-link">
                    Sign up
                  </Link>
                  <div className="signup-icon"></div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="user-name">
                    <Link to={`/user/${userId}`} className="menu-link">
                      {userName}
                    </Link>
                  </div>
                  <button onClick={this.logOut} className="logout-btn">
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
          {isLogin && (
            <div className="header-cart">
              <div className="count-in-cart" id="count-selected-item">
                <p>{shoppingList.length}</p>
              </div>
              <div
                id="cart"
                className="cart-icon"
                onClick={this.handlePopUp}
              ></div>
            </div>
          )}
        </div>
        {isPopUp && (
          <>
            <div className="Overlay"></div>
            <ShoppingItemList />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shoppingItemList: state.ShoppingListReducer,
    user: state.UserReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePopUp: () => dispatch(HandlePopUp()),
    logOut: () => dispatch(LogOut()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
