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
      const { name } = categoryList[0];
      this.setState({
        selectValue: name,
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
    const { selectValue } = this.state;
    return handleOnClick(values, selectValue);
  };

  render() {
    const { selectValue, fileValue } = this.state;
    const { formName, ipValueList, btnName, categoryList } = this.props;

    let idValue,
      nameValue,
      imageUrlValue,
      priceValue,
      colorValue,
      categoryValue,
      currencyValue;

    // - if have ipValueList is for Custom product otherwise is for Add Product
    if (ipValueList) {
      const {
        id,
        name,
        imageUrl,
        price,
        color,
        category,
        currency,
      } = ipValueList;

      idValue = id;
      nameValue = name;
      imageUrlValue = imageUrl;
      priceValue = price;
      colorValue = color;
      categoryValue = category;
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
            category: categoryValue || "",
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
            if (!values.currency) {
              errors.currency = "Required";
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
              <form onSubmit={handleSubmit}>
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
                  htmlFor="Image Url"
                  ipNameLabel="imageUrl"
                  ipType="text"
                  ipName="imageUrl"
                  ipId="imageUrl"
                  ipValue={values.imageUrl}
                  errName="imageUrl"
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

                {/* <select
                  className="select-category-list"
                  defaultValue={categoryValue}
                  onChange={this.handleOnchange}
                >
                  {categoryList.map((element) => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.name}
                      </option>
                    );
                  })}
                </select> */}
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
