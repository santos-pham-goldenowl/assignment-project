import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container, Row } from "reactstrap";

import { connect } from "react-redux";
import { authUser, updateState } from "../../redux/action/index";
import { headerToken } from "../../utilities/index";
import httpLayer from "../../httpLayer/index";
import LoginAdmin from "./LoginAdmin/index";
import AddProductAdmin from "./AddProductAdmin/index";
import AddCategoryAdmin from "./AddCategoryAdmin/index";
import CustomProductAdmin from "./CustomProductAdmin/index";
import CustomCategoryAdmin from "./CustomCategoryAdmin/index";
import CustomUserAdmin from "./CustomUserAdmin/index";
import CustomOrderAdmin from "./CustomOrderAdmin/index";
import ViewDetailOrderAdmin from "../../Component/AdminComp/ViewDetailOrderAdmin/index";
import MenuAdmin from "../../Component/AdminComp/MenuAdmin/index";
import CategoryManage from "./CategoryMangage/index";
import UserManage from "./UserManage/index";
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
