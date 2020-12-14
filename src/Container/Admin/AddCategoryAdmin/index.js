import React from "react";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { headerToken } from "../../../utilities";
import httpLayer from "../../../httpLayer";
import Input from "../../../Component/Form/input";

import "./style.css";

class AddCategoryAdmin extends React.Component {
  render() {
    return (
      <div className="form-admin">
        <Formik
          initialValues={{
            name: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            const token = await headerToken();
            httpLayer
              .post(
                "/api/categories",
                {
                  values,
                },
                token
              )
              .then((res) => {
                this.props.history.push("/admin/dashboard/category");
              })
              .catch((err) => {
                console.log("error: ", err);
              });
          }}
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
            <div className="add-product-admin">
              <h2>Add new Category</h2>
              <form onSubmit={handleSubmit}>
                <Input
                  clNameContainerDiv="ip-form"
                  htmlFor="name"
                  ipNameLabel="name"
                  ipType="text"
                  ipName="name"
                  ipId="name"
                  valueIp={values.name}
                  errName="name"
                  errorComponent="div"
                  errorClName="error"
                />
                {errors.name && touched.name}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="create-product-admin-btn"
                >
                  Add
                </button>
              </form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(AddCategoryAdmin);
