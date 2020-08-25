import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import React from "react";
import "./Header.css";
import Login from "../../Container/Login";
import Signup from "../../Container/Signup";
import User from "../../Container/User";
import Cart from "../Cart/Cart";
import Product from "../../Container/Product";
import ShoppingItemList from "../../Container/ShoppingItemList";
import ProductView from "../../Container/ProductView";

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
              <Link to="/user" className="menu-link">
                (Username)
              </Link>
            </div>
            <div className="header-cart">
              <div className="count-in-cart">
                <p>0</p>
              </div>
              <label htmlFor="cart-check-box" className="lbCart">
                <div to="/cart" className="cart-icon"></div>
              </label>
            </div>
          </div>
          <input
            hidden
            type="checkbox"
            id="cart-check-box"
            defaultChecked="false"
          ></input>
          <label htmlFor="cart-check-box" className="lbOverlay"></label>
          <ShoppingItemList />
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
          <Route path="/product/:id">
            <ProductView />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Header;
