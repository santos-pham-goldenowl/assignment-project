import React from "react";
import { headerToken } from "../../../utilities/index";
import httpLayer from "../../../httpLayer/index";
import { withRouter } from "react-router-dom";

import FormAdmin from "../../../Component/AdminComp/FormAdmin/index";

import "./style.css";
// import AddProductTestComp from "../../../Component/AdminComp/AddProductTestComp";

class AddProductAmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      isFetching: true,
    };
  }

  async componentDidMount() {
    const categoryList = await this.getCategory();
    this.setState({
      isFetching: false,
      categoryList: categoryList,
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

  handleOnClick = async (values, selectValue, fileValue) => {
    const token = await headerToken();

    token.headers["content-type"] =
      "multipart/form-data boundary=" + Math.random().toString().substr(2);

    const formData = new FormData();
    const { name, price, color, currency } = values;
    console.log("select value: ", selectValue);

    formData.append("name", name);
    formData.append("imageUrl", fileValue);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("category", selectValue);
    formData.append("currency", currency);

    httpLayer
      .post("/api/products/add", formData, token)
      .then((res) => {
        this.props.history.push("/admin/dashboard");
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  render() {
    const { categoryList, isFetching } = this.state;
    return (
      <>
        {!isFetching && (
          <div className="add-product-container">
            <FormAdmin
              formName={"Add a new product"}
              handleOnClick={this.handleOnClick}
              categoryList={categoryList}
              btnName="Create"
            />
          </div>
        )}
      </>
    );
  }
}

export default withRouter(AddProductAmin);
