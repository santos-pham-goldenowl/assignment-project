import React from "react";
import { Formik } from "formik";

import { TitleForm, Input, Button } from "../Component/Form/Form";
import HelmetComp from "../Component/Helmet/Helmet";
import "../Component/Form/Form.css";

class Signup extends React.Component {
  render() {
    return (
      <div className="signup-page">
        <HelmetComp title={"Sign up"} />
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
          // -onSubmit (Sign up)
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-container">
                  <TitleForm titleForm="Sign up" />
                  <div className="user-input">
                    <Input
                      clNameContainerDiv="input-email"
                      lbNameIp="Email"
                      ipType="email"
                      ipName="email"
                      idIp="email"
                      ipValue={values.email}
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
                  {/* <div>
                    {this.state.error ? (
                      <p className="err-login">{this.state.error}</p>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Signup;
