import React from "react";
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
    this.state = {
      isLogin: true,
    };
  }
  componentDidMount() {
    this.myRef.current.scrollTo(0, 0);
  }
  render() {
    const { isLogin } = this.state;
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
            <Route exact path="/">
              {isLogin ? <ProductList /> : <Redirect to="/login" />}
            </Route>
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

export default App;
