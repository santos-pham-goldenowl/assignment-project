import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HelmetComp from "../../../Component/Helmet/index";
import Input from "../../../Component/Form/input/index";
import Button from "../../../Component/Form/button/index";
import { authUser } from "../../../redux/action/index";
import Error from "../../../Component/Form/error/index";

import services from "../../../services/index";

import "../../../Component/Form/style.css";
import "./style.css";

class LoginAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errServer: "",
    };
  }

  // componentDidMount() {
  //   const { isLogin } = this.props.user;

  //   if (isLogin) {
  //     this.props.history.push("/admin/dashboard");
  //   }
  // }

  render() {
    const { errServer } = this.state;
    return (
      <div className="login-admin-page">
        <HelmetComp title={"login as administrator"} />
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

                  const { restUserData } = res.data.result;

                  const { lastName, id, avatarUrl, role } = restUserData;

                  this.props.auth(lastName, id, avatarUrl, role);
                  this.props.history.push("/admin/dashboard");
                } else {
                  this.setState({
                    errServer: res.data.errors,
                  });
                }
              })
              .catch((err) => {
                if (err) {
                  // const { error_message } = err.response.data;
                  // this.setState({
                  //   errServer: error_message,
                  // });
                  console.log("err: ", err);
                }
              });
          }}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-container">
                  <div className="title">
                    <p>Login as Administrator</p>
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
    auth: (userName, id, avatarUrl, role) =>
      dispatch(authUser(userName, id, avatarUrl, role)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginAdmin)
);
