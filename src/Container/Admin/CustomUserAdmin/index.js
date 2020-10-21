import React from "react";
import { headerToken } from "../../../utilities/index";
import httpLayer from "../../../httpLayer/index";
import { withRouter } from "react-router-dom";
import CustomUserForm from "../../../Component/AdminComp/CustomUserForm";

class CustomUserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customedProduct: [],
      user: [],
      isFetching: true,
    };
  }

  async componentDidMount() {
    const user = await this.getUser();
    this.setState({
      isFetching: false,
      user,
    });
  }

  getUser = async () => {
    const { id } = this.props.match.params;
    const token = await headerToken();
    return await httpLayer
      .get(`/api/users/${id}`, token)
      .then((res) => {
        const { user } = res.data;
        return user;
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  customUser = async (values, role) => {
    const token = await headerToken();
    values.role = role;
    console.log(values);
    console.log(role);
    httpLayer
      .post(
        "/api/users/custom",
        {
          values,
        },
        token
      )
      .then((res) => {
        this.props.history.push("/admin/dashboard/user");
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  render() {
    const { isFetching, user } = this.state;
    return (
      <>
        {!isFetching && (
          <CustomUserForm user={user} customUser={this.customUser} />
        )}
      </>
    );
  }
}

export default withRouter(CustomUserAdmin);
