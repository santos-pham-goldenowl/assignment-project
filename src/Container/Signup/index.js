import React from "react";
import { Formik } from "formik";
import axios from "axios";

import Input from "../../Component/Form/input/index";
import Button from "../../Component/Form/button/index";
import HelmetComp from "../../Component/Helmet";
import "../../Component/Form/style.css";
import "./style.css";

class Signup extends React.Component {
  render() {
    return (
      <div className="signup-page">
        <HelmetComp title={"Sign up"} />
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Required";
            }
            if (!values.firstName) {
              errors.firstname = "Required";
            }
            if (!values.lastName) {
              errors.last = "Required";
            }
            if (!values.phone) {
              errors.phone = "Required";
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
            axios
              .post("/api/signup", values)
              .then((response) => {
                if (response.data.success) {
                  window.location.href = "/login";
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-container">
                  <div className="title">
                    <p>Sign up</p>
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
                    <div className="test">
                      <Input
                        clNameContainerDiv="ip-form inline"
                        htmlFor="firstName"
                        ipNameLabel="First name"
                        ipType="name"
                        ipName="firstName"
                        ipId="firstName"
                        ipValue={values.firstName}
                        errName="firstName"
                        errorComponent="div"
                        errorClName="error"
                      />
                      <Input
                        clNameContainerDiv="ip-form"
                        htmlFor="lastName"
                        ipNameLabel="Last name"
                        ipType="name"
                        ipName="lastName"
                        ipId="lastName"
                        ipValue={values.lastName}
                        errName="lastName"
                        errorComponent="div"
                        errorClName="error"
                      />
                    </div>
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="phone"
                      ipNameLabel="Phone"
                      ipType="tel"
                      ipName="phone"
                      ipId="phone"
                      ipValue={values.phone}
                      errName="phone"
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
                    {/* <input type="file" className="avt-ip"></input> */}
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
