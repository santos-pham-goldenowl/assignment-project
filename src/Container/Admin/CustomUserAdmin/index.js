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
  render() {
    const { isFetching, user } = this.state;
    return <>{!isFetching && <CustomUserForm user={user} />}</>;
  }
}

export default withRouter(CustomUserAdmin);
