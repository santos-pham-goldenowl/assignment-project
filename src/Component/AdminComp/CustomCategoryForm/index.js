import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import Input from "../../../Component/Form/input/index";

class CustomCategoryAdmin extends React.Component {
  render() {
    const { value, id, handleOnSumbit } = this.props;
    console.log("value: ", value);
    return (
      <>
        <Formik
          initialValues={{
            name: value || "hi",
            id: id,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
          }}
          onSubmit={handleOnSumbit}
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
              <h2>Edit Category</h2>
              <form onSubmit={handleSubmit}>
                <Input
                  clNameContainerDiv="ip-form"
                  htmlFor="name"
                  ipNameLabel="name"
                  ipType="text"
                  ipName="name"
                  ipId="name"
                  ipValue={values.name}
                  errName="name"
                  errorComponent="div"
                  errorClName="error"
                />

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
    );
  }
}

export default withRouter(CustomCategoryAdmin);
