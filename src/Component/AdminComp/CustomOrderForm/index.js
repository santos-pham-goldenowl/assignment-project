import React from "react";
import { withRouter } from "react-router-dom";

import { handlePrice } from "../../../utilities/index";
import { Formik, Field } from "formik";
import Input from "../../../Component/Form/input/index";

import "./style.css";

class CustomOrderAmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
    };
  }

  componentDidMount() {
    const { status } = this.props.order;
    console.log("status: ", status);
    this.setState({
      selectValue: status,
    });
  }

  handleOnchangeSelectStatusShipment = (e) => {
    const { value } = e.target;
    this.setState({
      selectValue: value,
    });
  };

  handleCustomOrder = async (values, { setSubmitting }) => {
    setSubmitting(false);
    const { selectValue } = this.state;
    const { customOrder } = this.props;
    return customOrder(values, selectValue);
  };

  render() {
    const { selectValue } = this.state;
    const { order } = this.props;
    const { id, userId, totalAmount, status, user } = order;
    const newTotalAmount = handlePrice.formatPrice(totalAmount);
    return (
      <>
        <div className="custom-product-admin">
          <>
            <Formik
              initialValues={{
                id,
                userId,
                lastname: user.lastName,
                newTotalAmount,
                totalAmount,
                status,
              }}
              validate={(values) => {}}
              onSubmit={this.handleCustomOrder}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <div className="form-admin">
                  <h2>Custom user's information</h2>
                  <form onSubmit={handleSubmit}>
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="lastname"
                      ipNameLabel="Last Name"
                      ipType="text"
                      ipName="lastname"
                      ipId="lastname"
                      ipValue={values.lastname}
                      errName="lastname"
                      errorComponent="div"
                      errorClName="error"
                      status={true}
                    />
                    {errors.lastname && touched.lastname}
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="totalAmount"
                      ipNameLabel="Total Amount"
                      ipType="text"
                      ipName="totalAmount"
                      ipId="totalAmount"
                      ipValue={values.newTotalAmount}
                      errName="totalAmount"
                      errorComponent="div"
                      errorClName="error"
                      status={true}
                    />
                    {errors.totalAmount && touched.totalAmount}
                    <label className="shipment-status-lb">Status</label>
                    <Field
                      component="select"
                      id="status"
                      name="status"
                      value={selectValue}
                      className={"shipment-status-sl"}
                      onChange={this.handleOnchangeSelectStatusShipment}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </Field>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-classname"
                    >
                      Update
                    </button>
                  </form>
                </div>
              )}
            </Formik>
          </>
        </div>
      </>
    );
  }
}

export default withRouter(CustomOrderAmin);
