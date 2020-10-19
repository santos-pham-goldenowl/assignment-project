import React from "react";
import { headerToken } from "../../../utilities/index";
import httpLayer from "../../../httpLayer/index";
import { withRouter } from "react-router-dom";

import FormAdmin from "../../../Component/AdminComp/FormAdmin/index";

import "./style.css";

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
    console.log("categoryList in didmount: ", categoryList);
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
        console.log("results: ", results);
        return results;
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  handleOnclick = async (values, { setSubmitting }, selectValue) => {
    setSubmitting(false);
    values.category = selectValue;
    const token = await headerToken();

    // const formData = new FormData();
    // formData.append("myImage", this.state.file);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // axios
    //   .post("/upload", formData, config)
    //   .then((response) => {
    //     alert("The file is successfully uploaded");
    //   })
    //   .catch((error) => {});
    // token.headers[conten - type] = "multipart/form-date";
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
    const { categoryList } = this.state;
    return (
      <div className="add-product-container">
        <FormAdmin
          formName={"Add a new product"}
          handleOnclick={this.handleOnclick}
          categoryList={categoryList}
          btnName="Create"
        />
      </div>
    );
  }
}

export default withRouter(AddProductAmin);
