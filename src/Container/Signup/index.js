import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";

import Input from "../../Component/Form/input";
import Button from "../../Component/Form/button";
import HelmetComp from "../../Component/Helmet";
import Error from "../../Component/Form/error";

import "./style.css";

import services from "../../services";
import FileUpload from "../../Component/FileUpload";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errServer: "",
      fileValue: "",
    };
  }

  getValueUpload = (value) => {
    console.log("value: ", value);
    this.setState({ fileValue: value });
  };

  onSumbitSignUp = (values, { setSubmitting }) => {
    setSubmitting(false);
    const { email, firstName, lastName, password, phone } = values;
    console.log("values ne: ", values);
    const { fileValue } = this.state;
    const formData = new FormData();
    formData.append("imageUrl", fileValue[0]);
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("phone", phone);
    // - get value of file input by ref and concaternate it into values
    services
      .signup(formData)
      .then((response) => {
        if (response.data.success) {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log("err: ", err.response);
        const { error_message } = err.response.data;
        this.setState({
          errServer: error_message,
        });
      });
  };

  render() {
    const { errServer } = this.state;
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
            avatarUrl: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Required";
            }
            if (!values.firstName) {
              errors.firstName = "Required";
            }
            if (!values.lastName) {
              errors.lastName = "Required";
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
          // - onSubmit (Sign up)
          onSubmit={this.onSumbitSignUp}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-container">
                  <div className="title">
                    <p>Sign up</p>
                  </div>
                  {errServer && <Error error={this.state.errServer} />}
                  <div className="email-name-password">
                    <div className="left-form">
                      <Input
                        clNameContainerDiv="ip-form"
                        htmlFor="email"
                        ipNameLabel="Email"
                        ipType="email"
                        ipName="email"
                        ipId="email"
                        ipValue={values.email}
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
                        htmlFor="password"
                        ipNameLabel="Password"
                        ipType="password"
                        nameIp="password"
                        ipId="password"
                        ipValue={values.password}
                        errName="password"
                        errorComponent="div"
                        errorClName="error"
                      />
                    </div>
                    <div>
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
                      <FileUpload
                        lbName={"Avatar image"}
                        getValueUpload={this.getValueUpload}
                      />
                      {/* <Input
                        clNameContainerDiv="ip-form"
                        htmlFor="avatarUrl"
                        ipNameLabel="Avatar Url"
                        ipType="text"
                        nameIp="avatarUrl"
                        ipId="avatarUrl"
                        ipValue={values.avatarUrl}
                        errName="avatarUrl"
                        errorComponent="div"
                        errorClName="error"
                      /> */}
                    </div>
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

export default withRouter(Signup);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
