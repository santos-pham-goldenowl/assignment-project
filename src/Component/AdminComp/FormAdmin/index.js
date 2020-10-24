import React from "react";
import { Formik, Field } from "formik";
import Input from "../../Form/input/index";

import "./style.css";

class FormAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      fileValue: null,
    };
  }

  componentDidMount() {
    if (this.props.ipValueList) {
      const { category } = this.props.ipValueList;
      if (category) {
        this.setState({
          selectValue: category,
        });
      }
    }
    if (this.props.categoryList) {
      const { categoryList } = this.props;
      const { id } = categoryList[0];
      this.setState({
        selectValue: id,
      });
    }
  }

  handleOnChangeSelectCategory = (e) => {
    const { value } = e.target;

    this.setState({
      selectValue: value,
    });
  };

  onChangeFileValue = (e) => {
    this.setState({ fileValue: e.target.files[0] });
  };

  handleForm = (values, { setSubmitting }) => {
    setSubmitting(false);
    const { handleOnClick } = this.props;
    const { selectValue, fileValue } = this.state;
    return handleOnClick(values, selectValue, fileValue);
  };

  render() {
    const { selectValue, fileValue } = this.state;
    const { formName, ipValueList, btnName, categoryList } = this.props;

    let idValue,
      nameValue,
      imageUrlValue,
      priceValue,
      colorValue,
      currencyValue;

    // - if have ipValueList is for Custom product otherwise is for Add Product
    if (ipValueList) {
      const { id, name, imageUrl, price, color, currency } = ipValueList;

      idValue = id;
      nameValue = name;
      imageUrlValue = imageUrl;
      priceValue = price;
      colorValue = color;
      currencyValue = currency;
    }

    return (
      <>
        <Formik
          initialValues={{
            id: idValue || "",
            name: nameValue || "",
            imageUrl: imageUrlValue || "",
            price: priceValue || "",
            color: colorValue || "",
            currency: currencyValue || "VND" || "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.price) {
              errors.price = "Required";
            }
            if (!values.color) {
              errors.color = "Required";
            }
            return errors;
          }}
          onSubmit={this.handleForm}
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
              <h2>{formName}</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Input
                  clNameContainerDiv="ip-form"
                  htmlFor="name"
                  ipNameLabel="Name"
                  ipType="text"
                  ipName="name"
                  ipId="name"
                  ipValue={values.name}
                  errName="name"
                  errorComponent="div"
                  errorClName="error"
                />
                <Input
                  clNameContainerDiv="ip-form"
                  htmlFor="price"
                  ipNameLabel="Price"
                  ipType="text"
                  ipName="price"
                  ipId="price"
                  ipValue={values.price}
                  errName="price"
                  errorComponent="div"
                  errorClName="error"
                />
                <Input
                  clNameContainerDiv="ip-form"
                  htmlFor="color"
                  ipNameLabel="Color"
                  ipType="text"
                  ipName="color"
                  ipId="color"
                  ipValue={values.color}
                  errName="color"
                  errorComponent="div"
                  errorClName="error"
                />
                <label className="select-category-lb">Category</label>
                <Field
                  component="select"
                  id="category"
                  name="category"
                  value={selectValue}
                  className={"select-category-sl"}
                  onChange={this.handleOnChangeSelectCategory}
                >
                  {categoryList.map((element) => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.name}
                      </option>
                    );
                  })}
                </Field>
                <Input
                  clNameContainerDiv="ip-form"
                  htmlFor="currency"
                  ipNameLabel="Currency"
                  ipType="text"
                  ipName="currency"
                  ipId="currency"
                  ipValue={values.currency}
                  errName="currency"
                  errorComponent="div"
                  errorClName="error"
                />
                <input
                  className="file-ip"
                  type="file"
                  name="imageUrl"
                  onChange={this.onChangeFileValue}
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

export default FormAdmin;
