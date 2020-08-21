import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import React from "react";
import "../Style/Header.css";
import Login from "../Container/Login";
import Signup from "../Container/Signup";
import User from "../Container/User";
import Cart from "./Cart";
import Product from "../Container/Product";

class Header extends React.Component {
  render() {
    return (
      <Router>
        <div className="header">
          <div>
            <Link to="/" className="header-logo"></Link>
          </div>
          <div className="header-menu">
            <div className="header-menu-product">
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
              <Link to="/user" className="menu-link">
                (Username)
              </Link>
            </div>
            <div className="header-cart">
              <div className="count-in-cart">
                <p>0</p>
              </div>
              <Link to="/cart" className="cart-icon"></Link>
              {/* <div className="shopping-infor">
                <h3 className="shopping-infor-title">Shopping Information</h3>
                <div className="shopping-item">
                  <div className="shopping-item-container">
                    <div className="shopping-item-img"></div>
                    <div className="shopping-item-name">Name</div>
                    <div className="item-price-count">
                      <div>1</div>
                      <div>10.000</div>
                    </div>
                    <div className="remove-item">
                      <button>X</button>
                    </div>
                  </div>
                </div>
                <div className="test">
                  <button className="checkout-shopping">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path="/sign-up"></Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route exact path="/">
            <Product />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Header;
