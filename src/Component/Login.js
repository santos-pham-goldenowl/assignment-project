import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

import "../Style/Form.css";

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
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
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-container">
                  <div className="title">
                    <p>Log in</p>
                  </div>
                  <div className="user-input">
                    <div className="input-email">
                      <label className="span-form" for="email">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="input-pw">
                      <label className="span-form" for="pw">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="pw"
                        value={values.password}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <div className="btn-login">
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                  <div className="has-not-account">
                    <Link to="/signup">You do not have an acount yet?</Link>
                  </div>
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

export default Login;
