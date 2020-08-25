import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import HelmetComp from "../Component/Helmet/Helmet";
import { TitleForm, Input, Button } from "../Component/Form/Form";
import "../Component/Form/Form.css";

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
                  <TitleForm titleForm="Login" />
                  <div className="user-input">
                    <Input
                      clNameContainerDiv="input-email"
                      lbNameIp="Email"
                      typeIp="email"
                      nameIp="email"
                      idIp="email"
                      valueIp={values.email}
                      nameErr="email"
                      componentErr="div"
                      clNameErr="error"
                    />
                    <Input
                      clNameContainerDiv="input-pw"
                      lbNameIp="Password"
                      typeIp="password"
                      nameIp="password"
                      idIp="pw"
                      valueIp={values.password}
                      nameErr="password"
                      componentErr="div"
                      clNameErr="error"
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
