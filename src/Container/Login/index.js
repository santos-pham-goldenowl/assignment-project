import React from "react";
import { Formik } from "formik";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HelmetComp from "../../Component/Helmet/index";
import Input from "../../Component/Form/input/index";
import Button from "../../Component/Form/button/index";
import { LoginAct } from "../../redux/action/index";
import Error from "../../Component/Form/error/index";

import services from "../../services/index";

import "../../Component/Form/style.css";
import "./style.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errServer: "",
    };
  }
  render() {
    const { errServer } = this.state;
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
            services
              .login(values)
              .then((res) => {
                if (res.data.success) {
                  localStorage.setItem("token", res.data.token);
                  this.props.login(res.data.userName);
                  this.props.history.push("/");
                } else {
                  this.setState({
                    errServer: res.data.errors,
                  });
                }
              })
              .catch((err) => {
                const { error_message } = err.response.data;
                this.setState({
                  errServer: error_message,
                });
              });
          }}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-container">
                  <div className="title">
                    <p>Login</p>
                  </div>
                  {errServer && <Error error={this.state.errServer} />}
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
    login: (userName) => dispatch(LoginAct(userName)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
