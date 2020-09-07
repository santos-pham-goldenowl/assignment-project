import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Header from "./Component/Header/index";
import Footer from "./Component/Footer/index";
import Login from "./Container/Login/index";
import Signup from "./Container/Signup/index";
import User from "./Container/User/index";
import Cart from "./Container/Cart/index";
import ProductList from "./Container/ProductList/index";
import ProductView from "./Container/ProductView";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.myRef.current.scrollTo(0, 0);
  }
  // Check if have isLogin in LocalStorage is get this value. Otherwise, get the value in redux
  isLogin = () => {
    const { user } = this.props;
    const localStorageState = localStorage.getItem("persist:root");
    let isLoginLocalStorage;
    if (localStorageState) {
      const isLoginTemp = JSON.parse(localStorageState).UserReducer;
      isLoginLocalStorage = JSON.parse(isLoginTemp).isLogin;
    }
    const isLogin = isLoginLocalStorage ? isLoginLocalStorage : user.isLogin;
    return isLogin;
  };
  // PrivateRoute is used to render components respectively when entering home page
  PrivateRoute = ({ component: Component, ...rest }) => {
    const isLogin = this.isLogin();
    return (
      <Route
        render={(props) =>
          isLogin === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };
  render() {
    return (
      <Router>
        <div className="app" ref={this.myRef}>
          <Header />

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
            {/* <Route exact path="/">
              {this.state.isLogin ? <ProductList /> : <Redirect to="/login" />}
            </Route> */}
            <this.PrivateRoute path="/" component={ProductList} />
            <Route exact path="/product/:id">
              <ProductView />
            </Route>
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.UserReducer,
  };
}

export default connect(mapStateToProps, null)(App);
