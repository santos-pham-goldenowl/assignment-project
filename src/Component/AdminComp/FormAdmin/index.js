import React from "react";
import { Formik } from "formik";
import Input from "../../Form/input/index";

import "./style.css";

class FormAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 1,
    };
  }

  handleOnchange = (e) => {
    const { value } = e.target;

    this.setState({
      selectValue: value,
    });
  };

  render() {
    const { selectValue } = this.state;
    const {
      formName,
      handleOnclick,
      ipValueList,
      categoryList,
      btnName,
    } = this.props;

    let idValue,
      nameValue,
      imageUrlValue,
      priceValue,
      colorValue,
      categoryValue,
      currencyValue,
      newCategoryList;

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

      // Resort category list to set value for option in select tag.
      const nameCategory = ipValueList.categoryAs.name;
      newCategoryList = categoryList.filter((category) => {
        return category.name !== nameCategory;
      });
      newCategoryList.unshift(ipValueList.categoryAs);
      console.log("newCategory list: ", newCategoryList);
    } else {
      newCategoryList = categoryList;
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
            if (!values.imageUrl) {
              errors.imageUrl = "Required";
            }
            if (!values.price) {
              errors.price = "Required";
            }
            if (!values.color) {
              errors.color = "Required";
            }
            if (!values.category) {
              errors.category = "Required";
            }
            if (!values.currency) {
              errors.currency = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const temp = selectValue;
            return handleOnclick(values, { setSubmitting }, temp);
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
                <input type="file"></input>
                {/* <Input
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
                /> */}
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
                <select
                  className="select-category-list"
                  onChange={this.handleOnchange}
                >
                  {newCategoryList.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                <Input
                  clNameContainerDiv="ip-form"
                  htmlFor="currency"
                  ipNameLabel="currency"
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
