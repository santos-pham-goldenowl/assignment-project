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

  handleOnClick = async (values, selectValue) => {
    values.category = selectValue;
    const token = await headerToken();
    // console.log("category: ", values);
    // const formData = new FormData();
    // formData.append("myImage", fileValue);
    // console.log("formData: ", formData);
    console.log("values: ", values);
    httpLayer
      .post(
        "/api/products/add",
        {
          values,
        },
        token
      )
      .then((res) => {
        this.props.history.push("/admin/dashboard");
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
