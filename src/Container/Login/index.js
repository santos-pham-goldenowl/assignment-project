import React from "react";
import { Formik } from "formik";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import HelmetComp from "../../Component/Helmet/index";
import Input from "../../Component/Form/input/index";
import Button from "../../Component/Form/button/index";
import { LoginAct } from "../../redux/action/index";

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
            axios
              .post("/api/login", values)
              .then((res) => {
                if (res.data.success) {
                  localStorage.setItem("token", res.data.token);
                  this.props.login();
                  this.props.history.push("/");
                }
              })
              .catch((err) => console.log("err: ", err));

            // fetch("/login", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //     Accept: "application/json",
            //   },
            //   body: JSON.stringify(values),
            // })
            //   .then((res) => res.json())
            //   .then((data) => {
            //     this.props.login();
            // const { token } = data;
            // cookie.set("token", token);
            //
            // });

            // react router dom version 4
            // window.location = "/";
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
                      clNameContainerDiv="ip-form"
                      htmlFor="email"
                      ipNameLabel="Email"
                      ipType="email"
                      ipName="email"
                      ipId="email"
                      valueIp={values.email}
                      errName="email"
                      errorComponent="div"
                      errorClName="error"
                    />
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="password"
                      ipNameLabel="Password"
                      ipType="password"
                      nameIp="password"
                      ipId="password"
                      valueIp={values.password}
                      errName="password"
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

function mapStateToProps(state) {
  return {
    user: state.UserReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(LoginAct()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
