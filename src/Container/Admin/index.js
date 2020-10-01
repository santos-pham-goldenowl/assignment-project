import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { authUser, updateState } from "../../redux/action/index";
import { headerToken } from "../../utilities/index";
import httpLayer from "../../httpLayer/index";
import AdminDashboard from "./AdminDashboard/index";
import LoginAdmin from "./LoginAdmin/index";
import "./style.css";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }
  async componentDidMount() {
    console.log("didmount");
    await this.getUserInfor();
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
        });
    }
  }
  // -------
  ProtectedAdminRoute = ({ component: Component, ...rest }) => {
    const { role } = this.props.user;
    console.log("role: ", role);
    // console.log(role === "Admin");
    const isAdmin = role === "Admin" ? true : false;
    return (
      <Route
        {...rest}
        render={(props) =>
          isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/admin/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };

  render() {
    console.log("render");
    console.log("role in administrator: ", this.props.user.role);
    const { isFetching } = this.state;
    return (
      <>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <Router>
            <Switch>
              <this.ProtectedAdminRoute
                path="/admin/dashboard"
                component={AdminDashboard}
              />
              <Route path="/admin/login">
                <LoginAdmin />
              </Route>
            </Switch>
          </Router>
        )}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
