import React from "react";
import { headerToken } from "../../../utilities";
import httpLayer from "../../../httpLayer";
import { withRouter } from "react-router-dom";
import FormAdmin from "../../../Component/AdminComp/FormAdmin";

import "./style.css";

class CustomProductAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customedProduct: [],
      categoryList: [],
      isFetching: true,
    };
  }

  async componentDidMount() {
    const categoryList = await this.getCategory();
    const productList = await this.getProduct();

    this.setState({
      isFetching: false,
      categoryList: categoryList,
      customedProduct: productList,
    });
  }

  getCategory = async () => {
    const token = await headerToken();
    return await httpLayer
      .get("/api/categories", token)
      .then((res) => {
        const { results } = res.data;
        return results;
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  getProduct = async () => {
    const { id } = this.props.match.params;
    const token = await headerToken();
    return await httpLayer
      .get(`/api/products/${id}`, token)
      .then((res) => {
        const { result } = res.data;
        return result;
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  // handleOnClick = async (values, selectValue) => {
  //   values.category = selectValue;
  //   const token = await headerToken();
  //   httpLayer
  //     .post(
  //       "/api/products/custom",
  //       {
  //         values,
  //       },
  //       token
  //     )
  //     .then((res) => {
  //       console.log("success");
  //       this.props.history.push("/admin/dashboard/");
  //     });
  // };

  handleOnClick = async (values, selectValue, fileValue, oldValue) => {
    const token = await headerToken();

    token.headers["content-type"] =
      "multipart/form-data boundary=" + Math.random().toString().substr(2);

    const formData = new FormData();
    const { id, name, price, color, currency } = values;
    console.log("select value: ", selectValue);
    console.log("fileValue: ", fileValue);
    if (fileValue) {
      for (const key of Object.keys(fileValue)) {
        formData.append("imageUrl", fileValue[key]);
      }
    }

    formData.append("id", id);
    formData.append("name", name);
    // formData.append("imageUrl", fileValue);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("category", selectValue);
    formData.append("currency", currency);
    if (oldValue) {
      formData.append("oldValue", oldValue);
    }

    httpLayer
      .post("/api/products/custom", formData, token)
      .then((res) => {
        this.props.history.push("/admin/dashboard");
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  render() {
    const { customedProduct, categoryList } = this.state;
    const { isFetching } = this.state;
    return (
      <>
        {!isFetching && (
          <div className="custom-product-admin">
            <FormAdmin
              formName="Custom product"
              handleOnClick={this.handleOnClick}
              ipValueList={customedProduct}
              categoryList={categoryList}
              btnName="Update"
            />
          </div>
        )}
      </>
    );
  }
}

export default withRouter(CustomProductAdmin);
