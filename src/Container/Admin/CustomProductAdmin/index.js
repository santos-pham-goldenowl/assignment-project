import React from "react";
import { headerToken } from "../../../utilities/index";
import httpLayer from "../../../httpLayer/index";
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

  handleOnclick = async (values, { setSubmitting }, selectValue) => {
    setSubmitting(false);
    values.category = selectValue;
    const token = await headerToken();
    httpLayer
      .post(
        "/api/products/custom",
        {
          values,
        },
        token
      )
      .then((res) => {
        console.log("success");
        this.props.history.push("/admin/dashboard/");
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
              handleOnclick={this.handleOnclick}
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
