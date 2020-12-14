import React from "react";
import { withRouter } from "react-router-dom";
import { headerToken } from "../../utilities";

import httpLayer from "../../httpLayer";
import { handlePrice } from "../../utilities";

import "./style.css";

class HistoryOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItemList: [],
    };
  }
  async componentDidMount() {
    // console.log("path: ", this.props.match.params);
    const token = await headerToken();
    const { orderId } = this.props.match.params;

    httpLayer
      .get(`/api/checkout/order-detail/${orderId}`, token)
      .then((response) => {
        const { result } = response.data;
        // console.log("result: ", result);
        result.map((item) => {
          item.price = handlePrice.formatPrice(item.price);
          item.amount = handlePrice.formatPrice(item.amount);
          return item;
          // return !item.price && item.amount;
        });

        this.setState({
          orderItemList: result,
        });
      })
      .catch((err) => {
        console.log("errors: ", err);
      });
  }
  render() {
    const { orderItemList } = this.state;
    console.log("orderList in detail: ", orderItemList);
    return (
      <div className="history-order-detail">
        <div className="history-order-detail-container">
          <h2 className="title">Order Items Detail</h2>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
              {orderItemList.map((order) => {
                console.log("order.name: ", order.product.name);
                return (
                  <tr key={order.id}>
                    <td>{order.product.name}</td>
                    <td>{order.price}</td>
                    <td>{order.quantity}</td>
                    <td>{order.amount}</td>
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

export default withRouter(HistoryOrderDetail);
