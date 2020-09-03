import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import HelmetComp from "../../Component/Helmet/index";
import Input from "../../Component/Form/input/index";
import Button from "../../Component/Form/button/index";

import "../../Component/Form/style.css";
import "./style.css";

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <HelmetComp title={"login"} />
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          // -onSubmit (Sign in)
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-container">
                  <div className="title">
                    <p>Login</p>
                  </div>
                  <div className="user-input">
                    <Input
                      clNameContainerDiv="input-email"
                      ipNameLabel="Email"
                      typeIp="email"
                      nameIp="email"
                      ipId="email"
                      valueIp={values.email}
                      nameErr="email"
                      errorComponent="div"
                      errorClName="error"
                    />
                    <Input
                      clNameContainerDiv="input-pw"
                      ipNameLabel="Password"
                      typeIp="password"
                      nameIp="password"
                      ipId="pw"
                      valueIp={values.password}
                      nameErr="password"
                      errorComponent="div"
                      errorClName="error"
                    />
                  </div>
                  <Button disabled={isSubmitting} />
                  <div className="has-not-account">
                    <Link to="/signup">You do not have an acount yet?</Link>
                  </div>
                  <div>
                    <Link to="/" className="forgot-pw">
                      Forgot your password
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Login;
