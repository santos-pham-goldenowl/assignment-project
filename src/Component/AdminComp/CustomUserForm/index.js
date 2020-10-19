import React from "react";
import { headerToken } from "../../../utilities/index";
import httpLayer from "../../../httpLayer/index";
import { withRouter } from "react-router-dom";

import { Formik } from "formik";
import Input from "../../Form/input";

class CustomUserAdmin extends React.Component {
  render() {
    const { user } = this.props;
    const { id, email, lastName, firstName, avatarUrl, phone, role } = user;
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
                role: role || "",
              }}
              validate={(values) => {}}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                const token = await headerToken();
                httpLayer
                  .post(
                    "/api/users/custom",
                    {
                      values,
                    },
                    token
                  )
                  .then((res) => {
                    this.props.history.push("/admin/dashboard/user");
                  })
                  .catch((err) => {
                    console.log("error: ", err);
                  });
              }}
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

                    <Input
                      clNameContainerDiv="ip-form"
                      htmlFor="role"
                      ipNameLabel="role"
                      ipType="text"
                      ipName="role"
                      ipId="role"
                      ipValue={values.role}
                      errName="role"
                      errorComponent="div"
                      errorClName="error"
                    />
                    {errors.role && touched.role}
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
