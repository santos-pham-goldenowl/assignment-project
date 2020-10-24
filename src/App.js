import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./Container/Header/index";
import Footer from "./Container/Footer/index";
import Login from "./Container/Login/index";
import Signup from "./Container/Signup/index";
import User from "./Container/User/index";
import Cart from "./Container/Cart/index";
import ProductList from "./Container/ProductList/index";
import ProductView from "./Container/ProductView/index";
import HistoryOrder from "./Container/HistoryOrder/index";
import HistoryOrderDetail from "./Container/HistoryOrderDetail/index";
import Admin from "./Container/Admin/index";

import { authUser, updateState } from "./redux/action/index";
import headerToken from "./utilities/headerToken";
import httpLayer from "./httpLayer/index";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }
  // async componentWillMount() {
  //   await this.getUserInfor();
  //   this.setState({
  //     isFetching: false,
  //   });
  // }
  async componentDidMount() {
    await this.getUserInfor();
    await this.getShoppingList();

    this.setState({
      isFetching: false,
    });
  }

  async getUserInfor() {
    const token = await headerToken();
    if (!token.headers.Authorization.includes(null)) {
      return await httpLayer
        .get("/api/users/profile", token)
        .then((response) => {
          const { restUserData } = response.data.result;
          const { lastName, id, avatarUrl, role } = restUserData;

          this.props.auth(lastName, id, avatarUrl, role);
          return restUserData;
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
  }

  // Get cart and cart items
  async getShoppingList() {
    const token = await headerToken();
    const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

    if (!token.headers.Authorization.includes(null)) {
      if (shoppingList) {
        const idList = shoppingList.map((element) => element.id);

        return await httpLayer
          .get(`/api/products?ids=${idList}`, token)
          .then((response) => {
            const { results } = response.data;

            results.map((product) => {
              const { count } = shoppingList.find((item) => {
                return item.id === product.id;
              });
              return (product.count = count);
            });

            this.props.updateShoppingList(results);
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    }
  }

  // PrivateRoute is used to render components respectively when entering home page whether user logged in or not
  PrivateRoute = ({ component: Component, ...rest }) => {
    let { isLogin } = this.props.user;
    return (
      <Route
        {...rest}
        render={(props) =>
          isLogin ? (
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

  renderRoutes = () => {
    const {
      user: { role },
    } = this.props;

    return role.toLowerCase() === "admin"
      ? this.renderAdminRoutes()
      : this.renderAppRoutes();
  };

  renderAdminRoutes = () => {
    return <Admin />;
  };

  renderAppRoutes = () => {
    return (
      <>
        <Header />
        <Switch>
          <this.PrivateRoute exact path="/" component={ProductList} />

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route exact path="/user/:id">
            <User />
          </Route>

          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route exact path="/user/:id/shopping-history">
            <HistoryOrder />
          </Route>

          <Route exact path="/user/:id/shopping-history/order/:orderId/detail">
            <HistoryOrderDetail />
          </Route>

          <Route exact path="/products/:id">
            <ProductView />
          </Route>
        </Switch>
        <Footer />
      </>
    );
  };

  render() {
    const { isFetching } = this.state;
    return (
      <Router>
        {isFetching ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="app">{this.renderRoutes()}</div>
        )}
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.UserReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (userName, id, avatarUrl, role) =>
      dispatch(authUser(userName, id, avatarUrl, role)),
    updateShoppingList: (list) => dispatch(updateState(list)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
