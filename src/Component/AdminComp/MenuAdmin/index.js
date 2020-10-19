import React from "react";
import { Col } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "./style.css";

import { changeAction } from "../../../redux/action";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      category: [],
      user: [],
      currentState: 0,
    };
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    if (pathname.includes("category")) {
      this.setState({
        currentState: 2,
      });
    } else if (pathname.includes("user")) {
      this.setState({
        currentState: 3,
      });
    } else if (pathname.includes("dashboard")) {
      this.setState({
        currentState: 1,
      });
    }
  }

  changeCurrentComponentAdmin(number) {
    this.props.change(number);
    this.setState({
      currentState: number,
    });
  }

  render() {
    const { currentState } = this.state;
    let bg1, bg2, bg3, bg4;
    const style = {
      backgroundColor: "#fff",
      color: "#b09943",
    };
    (currentState === 1 && (bg1 = style)) ||
      (currentState === 2 && (bg2 = style)) ||
      (currentState === 3 && (bg3 = style)) ||
      (currentState === 4 && (bg4 = style));
    return (
      <>
        <Col md="3" sm="6" className="admin-dashboard-left">
          <div className="admin-dashboard-left-container">
            <p className="title-navbar">Menu</p>
            <ul>
              <li>
                <Link
                  to="/admin/dashboard"
                  style={bg1}
                  className="menu-navbar-link"
                  onClick={() => this.changeCurrentComponentAdmin(1)}
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/category"
                  style={bg2}
                  className="menu-navbar-link"
                  onClick={() => this.changeCurrentComponentAdmin(2)}
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/user"
                  style={bg3}
                  className="menu-navbar-link"
                  onClick={() => this.changeCurrentComponentAdmin(3)}
                >
                  User
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/orders"
                  style={bg4}
                  className="menu-navbar-link"
                  onClick={() => this.changeCurrentComponentAdmin(4)}
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.AdminReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    change: (params) => dispatch(changeAction(params)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
);
