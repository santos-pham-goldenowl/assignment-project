import React from "react";
import { withRouter } from "react-router-dom";
import CustomCategoryForm from "../../../Component/AdminComp/CustomCategoryForm";
import httpLayer from "../../../httpLayer";
import { headerToken } from "../../../utilities";

class CustomCategoryAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isFetChing: true,
    };
  }

  async componentDidMount() {
    const customedCategory = await this.getCustomedCategory();
    const { name } = customedCategory;
    this.setState({
      value: name,
      isFetChing: false,
    });
  }

  getCustomedCategory = async () => {
    const { id } = this.props.match.params;
    const token = await headerToken();
    return httpLayer
      .get(`/api/categories/${id}`, token)
      .then((res) => {
        const { category } = res.data;
        return category;
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  customCategory = async (values) => {
    const token = await headerToken();
    httpLayer
      .post("/api/categories/custom", { values }, token)
      .then((res) => {
        this.props.history.push("/admin/dashboard/category");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  render() {
    const { value, isFetChing } = this.state;
    const { id } = this.props.match.params;
    return (
      <>
        {!isFetChing && (
          <CustomCategoryForm
            value={value}
            id={id}
            customCategory={this.customCategory}
          />
        )}
      </>
    );
  }
}

export default withRouter(CustomCategoryAdmin);
