import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Col } from "reactstrap";

import HelmetComp from "../../../Component/Helmet";
import httpLayer from "../../../httpLayer";
import { headerToken, handlePrice } from "../../../utilities/index";

import "./style.css";

class OrdersManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      isFetChing: true,
      userName: "",
      orderStatus: "pending",
    };
  }
  handleInputChange = (e) => {
    const name = e.target.name;
    const { value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  async componentDidMount() {
    const orderList = await this.getOrderList();
    orderList.map((order) => {
      return (order.totalAmount = handlePrice.formatPrice(order.totalAmount));
    });

    this.setState({
      orderList,
      isFetChing: false,
    });
  }

  getOrderList = async () => {
    const token = await headerToken();
    return httpLayer
      .get("/api/checkout", token)
      .then((response) => {
        const { orderList } = response.data;
        return orderList;
      })
      .catch((err) => {
        console.log("error from server: ", err);
      });
  };

  search = async (userName, orderStatus) => {
    const token = await headerToken();
    httpLayer
      .post("/api/checkout/search/", { userName, orderStatus }, token)
      .then((res) => {
        const { orderList } = res.data;
        this.setState({
          orderList,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  render() {
    const { orderList, isFetChing, userName, orderStatus } = this.state;

    return (
      <>
        {!isFetChing && (
          <>
            <HelmetComp title={"Admin Orders"} />
            <Col md="9" sm="6" className="admin-dashboard-right">
              <div className="search-orders">
                <input
                  type="text"
                  name="userName"
                  placeholder="User name"
                  onChange={this.handleInputChange}
                  className="find-user-ip"
                ></input>
                <select
                  onChange={this.handleInputChange}
                  name="orderStatus"
                  className="select-status-order"
                >
                  <option>pending</option>
                  <option>paid</option>
                </select>
                <button
                  className="find-user-btn"
                  onClick={() => this.search(userName, orderStatus)}
                >
                  Search
                </button>
              </div>
              <table className="orders-table-admin">
                <tbody>
                  <tr>
                    <th>Stt</th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                    <th>View detail</th>
                  </tr>
                  {orderList.map((order) => {
                    return (
                      <tr key={order.id}>
                        <td className="couterCell"></td>
                        <td>{order.id}</td>
                        <td>{order.user.lastName}</td>
                        <td>{order.totalAmount}</td>
                        <td>{order.status}</td>
                        <td>{order.createdAt}</td>
                        <td>
                          <a
                            href={`/admin/dashboard/orders/update/${order.id}`}
                          >
                            Update
                          </a>
                        </td>
                        <td>
                          <a
                            href={`/admin/dashboard/orders/view-detail/${order.id}`}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer,
  };
};

export default withRouter(connect(mapStateToProps, null)(OrdersManage));
