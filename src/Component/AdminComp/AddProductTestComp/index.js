import React from "react";
import { Formik } from "formik";
import { headerToken } from "../../../utilities/index";
import httpLayer from "../../../httpLayer/index";

class AddProductTestComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 1,
      fileValue: null,
    };
  }

  handleOnchange = (e) => {
    const { value } = e.target;

    this.setState({
      selectValue: value,
    });
  };

  onChange = (e) => {
    console.log("e.target.files[0]: ", e.target.files[0]);
    this.setState({ fileValue: e.target.files[0] });
  };

  handleOnclick = async (values, { setSubmitting }, selectValue, fileValue) => {
    setSubmitting(false);

    values.category = selectValue;
    const token = await headerToken();

    const formData = new FormData();
    formData.append("myImage", fileValue);
    token.headers["Content-Type"] = "multipart/form-data";
    console.log("token: ", token);

    httpLayer
      .post(
        "/api/products/add",
        formData,
        //    {
        //       formData,
        //       values,
        //     },
        token
      )
      .then((res) => {
        this.props.history.push("/admin/dashboard");
      });
  };

  render() {
    const { selectValue, fileValue } = this.state;
    const { formName, btnName } = this.props;

    return (
      <>
        <Formik
          initialValues={{}}
          validate={(values) => {}}
          onSubmit={(values, { setSubmitting }) => {
            const temp = selectValue;
            return this.handleOnclick(
              values,
              { setSubmitting },
              temp,
              fileValue
            );
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <div className="form-admin">
              <h2>{formName}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  onChange={this.onChange}
                  name="myImage"
                ></input>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-classname"
                >
                  {btnName}
                </button>
              </form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}

export default AddProductTestComp;
