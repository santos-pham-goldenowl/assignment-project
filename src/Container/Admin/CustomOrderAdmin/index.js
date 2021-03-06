import React from "react";
import { withRouter } from "react-router-dom";

import CustomOrderForm from "../../../Component/AdminComp/CustomOrderForm";
import { headerToken } from "../../../utilities";
import httpLayer from "../../../httpLayer";

class CustomOrderAmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      isFetching: true,
    };
  }
  async componentDidMount() {
    const order = await this.getOrder();
    this.setState({
      isFetching: false,
      order,
    });
  }

  getOrder = async () => {
    const { id } = this.props.match.params;
    const token = await headerToken();
    return await httpLayer
      .get(`/api/checkout/${id}`, token)
      .then((res) => {
        const { order } = res.data;
        return order;
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  customOrder = async (values, status) => {
    const token = await headerToken();
    const data = {
      id: values.id,
      userId: values.userId,
      lastName: values.lastName,
      totalAmount: values.totalAmount,
      status: status,
    };

    console.log("values: ", values);
    httpLayer
      .post(
        "/api/checkout/update",
        {
          data,
        },
        token
      )
      .then((res) => {
        this.props.history.push("/admin/dashboard/orders");
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  render() {
    const { isFetching, order } = this.state;
    return (
      <>
        {!isFetching && (
          <CustomOrderForm order={order} customOrder={this.customOrder} />
        )}
      </>
    );
  }
}

export default withRouter(CustomOrderAmin);
