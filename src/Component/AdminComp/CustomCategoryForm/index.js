import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import Input from "../../../Component/Form/input/index";

class CustomCategoryForm extends React.Component {
  handleCustomCategory = (values, { setSubmitting }) => {
    setSubmitting(false);
    const { customCategory } = this.props;
    return customCategory(values);
  };

  render() {
    const { value, id } = this.props;

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
          onSubmit={this.handleCustomCategory}
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

export default withRouter(CustomCategoryForm);
