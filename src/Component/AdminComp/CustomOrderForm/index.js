import React from "react";
import { withRouter } from "react-router-dom";

import { handlePrice } from "../../../utilities/index";
import { Formik } from "formik";
import Input from "../../../Component/Form/input/index";

import "./style.css";

class CustomOrderAmin extends React.Component {
  render() {
    const { order, handleOnSubmit } = this.props;
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
              onSubmit={handleOnSubmit}
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
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="status"
                      ipNameLabel="Status"
                      ipType="text"
                      ipName="status"
                      ipId="status"
                      ipValue={values.status}
                      errName="status"
                      errorComponent="div"
                      errorClName="error"
                    />
                    {errors.status && touched.status}
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
