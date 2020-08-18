import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import React from "react";
import "../Style/Header.css";
import Login from "./Login";
import Signup from "./Signup";
import Cart from "./Cart";
import Home from "./Home";

class Header extends React.Component {
  render() {
    return (
      <Router>
        <div className="header">
          <div className="header-logo"></div>
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
              <Link to="#" className="menu-link">
                (Username)
              </Link>
            </div>
            <div className="header-cart">
              <div className="count-in-cart">
                <p>0</p>
              </div>
              <Link to="/cart" className="cart-icon"></Link>
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path="/sign-up"></Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Header;
