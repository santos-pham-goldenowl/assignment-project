import React from "react";
import { withRouter } from "react-router-dom";

import { headerToken } from "../../../utilities";
import httpLayer from "../../../httpLayer";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import HelmetComp from "../../../Component/Helmet";

import "./style.css";

class CategoryManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      perPage: 10,
    };
  }

  async componentDidMount() {
    const token = await headerToken();
    httpLayer
      .get("/api/categories", token)
      .then((res) => {
        const { results } = res.data;
        const { perPage } = this.state;
        if (results.length > 10) {
          const pageCount = Math.ceil(results.length / perPage);
          const newList = results.slice(0, perPage);
          this.setState({
            categoryList: newList,
            pageCount,
          });
        }
        this.setState({
          categoryList: results,
        });
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }

  deleteCategory = async (id) => {
    const token = await headerToken();
    httpLayer
      .post("/api/categories/delete", { id }, token)
      .then((response) => {
        const data = response.data.results;
        this.setState({
          categoryList: data,
        });
      })
      .catch((error) => {
        console.log("errors: ", error);
      });
  };

  render() {
    const { categoryList, pageCount } = this.state;
    const { pathname } = this.props.location;

    return (
      <div className="category-list">
        <HelmetComp title={"Admin caregories"} />
        <h2>Category List</h2>
        <table className="category-table-admin">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Name</th>
              <th>Custom</th>
              <th>Delete</th>
            </tr>
            {categoryList.map((category) => {
              return (
                <tr key={category.id}>
                  <td className="couterCell"></td>
                  <td>{category.name}</td>
                  <td>
                    <a href={`${pathname}/edit/${category.id}`}>edit</a>
                  </td>
                  <td>
                    <button onClick={() => this.deleteCategory(category.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/admin/dashboard/add-category" className="add-new-category">
          Add a new category
        </Link>
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

export default withRouter(CategoryManage);
