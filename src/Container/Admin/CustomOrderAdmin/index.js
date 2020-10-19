import React from "react";
import { withRouter } from "react-router-dom";

import CustomOrderForm from "../../../Component/AdminComp/CustomOrderForm/index";
import { headerToken } from "../../../utilities/index";
import httpLayer from "../../../httpLayer/index";

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

  handleOnSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    const token = await headerToken();
    delete values.newTotalAmount;
    httpLayer
      .post(
        "/api/checkout/update",
        {
          values,
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
          <CustomOrderForm order={order} handleOnSubmit={this.handleOnSubmit} />
        )}
      </>
    );
  }
}

export default withRouter(CustomOrderAmin);
