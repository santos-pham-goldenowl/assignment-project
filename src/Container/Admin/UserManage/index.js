import React from "react";
import { withRouter } from "react-router-dom";
import httpLayer from "../../../httpLayer";
import ReactPaginate from "react-paginate";
import { headerToken } from "../../../utilities";
import HelmetComp from "../../../Component/Helmet";

import "./style.css";

class UserManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      perPage: 10,
      currentPage: 0,
      pageCount: 0,
    };
  }
  async componentDidMount() {
    const token = await headerToken();
    httpLayer
      .get("/api/users", token)
      .then((res) => {
        const { result } = res.data;
        const { perPage } = this.state;
        if (result.length > 10) {
          const pageCount = Math.ceil(result.length / perPage);
          const newList = result.slice(0, perPage);
          this.setState({
            userList: newList,
            pageCount,
          });
        }
        this.setState({
          userList: result,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  deleteUser = async (id) => {
    const token = await headerToken();
    httpLayer
      .post("/api/users/delete", { id }, token)
      .then((res) => {
        console.log("res: ", res);
        const { newUserList } = res.data;
        this.setState({
          userList: newUserList,
        });
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
  render() {
    const { userList, pageCount } = this.state;
    const { pathname } = this.props.location;
    return (
      <div className="user-list">
        <HelmetComp title={"Admin users"} />

        <h2>User List</h2>
        <table className="users-admin">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Id</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {userList.map((category) => {
              return (
                <tr key={category.id}>
                  <td className="couterCell"></td>
                  <td>{category.id}</td>
                  <td>{category.email}</td>
                  <td>
                    {category.lastName} {category.firstName}
                  </td>
                  <td>{category.phone}</td>
                  <td>{category.role}</td>
                  <td>
                    <a href={`${pathname}/edit/${category.id}`}>edit</a>
                  </td>
                  <td>
                    <button onClick={() => this.deleteUser(category.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {pageCount > 1 && (
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(UserManage);
