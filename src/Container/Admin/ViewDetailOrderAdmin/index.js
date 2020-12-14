import React from "react";
import { withRouter } from "react-router-dom";
import { headerToken } from "../../../utilities";

import httpLayer from "../../../httpLayer";
import { handlePrice } from "../../../utilities";

import "./style.css";

class ViewDetailOrderAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItemList: [],
    };
  }
  async componentDidMount() {
    const result = await this.getOrderItemsList();
    result.map((item) => {
      item.price = handlePrice.formatPrice(item.price);
      item.amount = handlePrice.formatPrice(item.amount);
      return item;
    });

    console.log("map: ", result);

    this.setState({
      orderItemList: result,
    });
  }

  getOrderItemsList = async () => {
    const token = await headerToken();
    const { id } = this.props.match.params;
    return httpLayer
      .get(`/api/checkout/order-detail/${id}`, token)
      .then((response) => {
        const { result } = response.data;
        return result;
      })
      .catch((err) => {
        console.log("errors: ", err);
      });
  };

  render() {
    const { orderItemList } = this.state;
    return (
      <div className="detail-order-admin">
        <div className="detail-order-admin-container">
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

export default withRouter(ViewDetailOrderAdmin);
