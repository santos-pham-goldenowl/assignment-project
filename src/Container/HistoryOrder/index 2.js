import React from "react";
import { withRouter, Link } from "react-router-dom";
import httpLayer from "../../httpLayer";
import { connect } from "react-redux";
import { handlePrice } from "../../utilities/index";

import { headerToken } from "../../utilities/index";

import "./style.css";
class HistoryOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
    };
  }

  async componentDidMount() {
    const { userId } = this.props.user;
    const token = await headerToken();
    // token.headers.userId = userId;
    httpLayer
      // .get("/api/checkout", token, {
      //   data: {
      //     username: "Thang",
      //   },
      // })
      .get(`/api/checkout/user/${userId}`, token)
      .then((response) => {
        const { orders } = response.data;
        orders.map((order) => {
          return (order.totalAmount = handlePrice.formatPrice(
            order.totalAmount
          ));
        });
        this.setState({
          orderList: orders,
        });
      })
      .catch((err) => {
        console.log("error from server: ", err);
      });
  }

  render() {
    const { orderList } = this.state;
    const { pathname } = this.props.location;
    return (
      <div className="shopping-history-page">
        <div className="shopping-history-container">
          <h1 className="title">Shopping List</h1>
          <table>
            <tbody>
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>View detail</th>
              </tr>
              {orderList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.totalAmount}</td>
                    <td>{item.status}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <Link to={`${pathname}/order/${item.id}/detail`}>
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer,
  };
};

export default withRouter(connect(mapStateToProps, null)(HistoryOrder));
