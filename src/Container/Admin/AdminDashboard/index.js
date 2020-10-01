import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Formik } from "formik";
import "./style.css";
import httpLayer from "../../../httpLayer";
import { headerToken } from "../../../utilities";
import axios from "axios";

class AdminDashboard extends React.Component {
  render() {
    return (
      <Router>
        <div className="admin-dashboard">
          <h3>This page can only be accessed by administrators.</h3>
          <Formik
            initialValues={{ category: "" }}
            validate={(values) => {}}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);

              const token = await headerToken();
              // const token = localStorage.getItem("token");
              httpLayer.post(
                "http://localhost:3002/api/categories",
                {
                  values,
                },
                token
              );
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
              <form onSubmit={handleSubmit}>
                <input
                  type="category"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                />
                {errors.category && touched.category && errors.category}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </Router>
    );
  }
}

export default AdminDashboard;
