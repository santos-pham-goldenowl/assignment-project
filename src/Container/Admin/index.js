import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container, Row } from "reactstrap";

import { connect } from "react-redux";
import { authUser, updateState } from "../../redux/action";
import { headerToken } from "../../utilities";
import httpLayer from "../../httpLayer";
import LoginAdmin from "./LoginAdmin";
import AddProductAdmin from "./AddProductAdmin";
import AddCategoryAdmin from "./AddCategoryAdmin";
import CustomProductAdmin from "./CustomProductAdmin";
import CustomCategoryAdmin from "./CustomCategoryAdmin";
import CustomUserAdmin from "./CustomUserAdmin";
import CustomOrderAdmin from "./CustomOrderAdmin";
import ViewDetailOrderAdmin from "./ViewDetailOrderAdmin";
import MenuAdmin from "../../Component/AdminComp/MenuAdmin";
import CategoryManage from "./CategoryMangage";
import UserManage from "./UserManage";
import ProductManage from "./ProductManage";
import OrdersManage from "./OrdersManage";

import "./style.css";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }
  async componentDidMount() {
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
    const isAdmin = role === "Admin";

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
    const { isFetching } = this.state;
    return (
      <>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <Router>
            <div className="admin-dashboard-page">
              <Container fluid className="admin-dashboard-container">
                <Row className="title-admin">
                  <h3>This page can only be accessed by administrators.</h3>
                </Row>
                <Row className="main-row-admin">
                  <MenuAdmin />

                  <Switch>
                    <Route exact path="/admin/dashboard/category">
                      <CategoryManage />
                    </Route>
                    <Route exact path="/admin/dashboard/user">
                      <UserManage />
                    </Route>
                    <Route exact path="/admin/dashboard/user/edit/:id">
                      <CustomUserAdmin />
                    </Route>
                    <Route exact path="/admin/dashboard/add-category">
                      <AddCategoryAdmin />
                    </Route>
                    <Route exact path="/admin/dashboard/custom-product/id=:id">
                      <CustomProductAdmin />
                    </Route>
                    <Route exact path="/admin/dashboard/add-product">
                      <AddProductAdmin />
                    </Route>
                    <Route exact path="/admin/dashboard/category/edit/:id">
                      <CustomCategoryAdmin />
                    </Route>
                    <Route exact path="/admin/dashboard/orders">
                      <OrdersManage />
                    </Route>
                    <Route exact path="/admin/dashboard/orders/update/:id">
                      <CustomOrderAdmin />
                    </Route>
                    <Route exact path="/admin/dashboard/orders/view-detail/:id">
                      <ViewDetailOrderAdmin />
                    </Route>
                    <this.ProtectedAdminRoute
                      exact
                      path="/admin/dashboard"
                      component={ProductManage}
                    />
                    <Route path="/admin/login">
                      <LoginAdmin />
                    </Route>
                  </Switch>
                </Row>
              </Container>
            </div>
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
