import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import ShoppingItemList from "../../Container/ShoppingItemList/index";
import { HandlePopUp } from "../../redux/action";

class Header extends React.Component {
  handlePopUp = () => {
    this.props.handlePopUp();
  };
  render() {
    const { shoppingList, isPopUp } = this.props.shoppingItemList;
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
            <div>
              <p>Log out</p>
            </div>
            <Link to="/user" className="menu-link">
              (Username)
            </Link>
          </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePopUp: () => dispatch(HandlePopUp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
