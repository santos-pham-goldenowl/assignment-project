import React from "react";
import { withRouter } from "react-router-dom";

import { Formik, Field } from "formik";
import Input from "../../Form/input";

import "./style.css";

class CustomUserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
    };
  }

  componentDidMount() {
    if (this.props.user) {
      const { role } = this.props.user;
      this.setState({
        selectValue: role,
      });
    }
  }

  handleOnChangeSelectUserRole = (e) => {
    const { value } = e.target;
    this.setState({
      selectValue: value,
    });
  };

  handleCustomUser = async (values, { setSubmitting }) => {
    setSubmitting(false);

    const { selectValue } = this.state;
    const { customUser } = this.props;

    return customUser(values, selectValue);
  };

  render() {
    const { selectValue } = this.state;
    const { user } = this.props;
    const { id, email, lastName, firstName, avatarUrl, phone } = user;
    return (
      <>
        <div className="custom-product-admin">
          <>
            <Formik
              initialValues={{
                id: id || "",
                email: email || "",
                firstname: firstName || "",
                lastname: lastName || "",
                phone: phone || "",
                avatarUrl: avatarUrl || "",
              }}
              validate={(values) => {}}
              onSubmit={this.handleCustomUser}
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
                <div className="form-admin">
                  <h2>Custom user's information</h2>
                  <form onSubmit={handleSubmit}>
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="email"
                      ipNameLabel="email"
                      ipType="text"
                      ipName="email"
                      ipId="email"
                      ipValue={values.email}
                      errName="email"
                      errorComponent="div"
                      errorClName="error"
                    />
                    {errors.email && touched.email}
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="firstname"
                      ipNameLabel="firstname"
                      ipType="text"
                      ipName="firstname"
                      ipId="firstname"
                      ipValue={values.firstname}
                      errName="firstname"
                      errorComponent="div"
                      errorClName="error"
                    />
                    {errors.firstname && touched.firstname}
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="lastname"
                      ipNameLabel="lastname"
                      ipType="text"
                      ipName="lastname"
                      ipId="lastname"
                      ipValue={values.lastname}
                      errName="lastname"
                      errorComponent="div"
                      errorClName="error"
                    />
                    {errors.lastname && touched.lastname}
                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="phone"
                      ipNameLabel="phone"
                      ipType="text"
                      ipName="phone"
                      ipId="phone"
                      ipValue={values.phone}
                      errName="phone"
                      errorComponent="div"
                      errorClName="error"
                    />
                    {errors.phone && touched.phone}

                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="avatarUrl"
                      ipNameLabel="avatarUrl"
                      ipType="text"
                      ipName="avatarUrl"
                      ipId="avatarUrl"
                      ipValue={values.avatarUrl}
                      errName="avatarUrl"
                      errorComponent="div"
                      errorClName="error"
                    />
                    {errors.avatarUrl && touched.avatarUrl}
                    <label className="user-role-lb">role</label>
                    <Field
                      component="select"
                      id="category"
                      name="category"
                      value={selectValue}
                      className={"user-role-sl"}
                      onChange={this.handleOnChangeSelectUserRole}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </Field>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-classname"
                    >
                      Update
                    </button>
                  </form>
                </div>
              )}
            </Formik>
          </>
        </div>
      </>
    );
  }
}

export default withRouter(CustomUserAdmin);
