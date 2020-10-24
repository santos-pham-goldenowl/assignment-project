import React from "react";
import { Col } from "reactstrap";
import ReactPaginate from "react-paginate";

import httpLayer from "../../../httpLayer";
import { headerToken, handlePrice } from "../../../utilities";
import HelmetComp from "../../../Component/Helmet/index";

import "./style.css";

class ProductManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      isFetching: true,
      perPage: 10,
      list: [],
      currentPage: 0,
      pageCount: 0,
    };
  }

  async componentDidMount() {
    const token = await headerToken();
    // token.responseType = "blob";
    const { currentPage } = this.state;
    httpLayer
      .get(`/api/products?page=${currentPage}`, token)
      .then((response) => {
        console.table(response.data.productList);
        const data = response.data.productList;
        const { count } = response.data;
        const newData = data.map((element) => {
          element.price = handlePrice.formatPrice(element.price);
          return element;
        });

        const { perPage } = this.state;
        const pageCount = Math.ceil(count / perPage);

        this.setState({
          list: newData,
          isFetching: false,
          pageCount,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    if (!value) {
      window.location.reload();
    }
    this.setState({
      searchValue: value,
    });
  };

  deleteProduct = async (id) => {
    const token = await headerToken();
    httpLayer
      .post("/api/products/delete", { id }, token)
      .then((response) => {
        const { list } = this.state;
        const newList = list.filter((item) => {
          return item.id === id;
        });
        this.setState({
          list: newList,
        });

        // const data = response.data.results;
        // data.map((element) => {
        //   element.price = handlePrice.formatPrice(element.price);
        //   return element;
        // });
        // this.setState({
        //   list: data,
        // });
      })
      .catch((error) => {
        console.log("errors: ", error);
      });
  };

  searchProduct = async () => {
    const { searchValue } = this.state;
    const params = searchValue;
    const token = await headerToken();

    if (params) {
      httpLayer
        .post("/api/products/search", { params }, token)
        .then((response) => {
          const { assets } = response.data;
          this.setState({
            list: assets,
          });
        })
        .catch((error) => {
          console.log("errors: ", error);
        });
    }
  };

  handlePageClick = async (e) => {
    const { selected } = e;
    const token = await headerToken();

    httpLayer
      .get(`/api/products?page=${selected}`, token)
      .then((response) => {
        const { productList } = response.data;
        productList.map((element) => {
          element.price = handlePrice.formatPrice(element.price);
          return element;
        });
        this.setState({
          list: productList,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  render() {
    const { searchValue, list, pageCount, isFetching } = this.state;
    return (
      <>
        <HelmetComp title={"Admin products"} />
        {!isFetching && (
          <Col md="9" sm="6" className="admin-dashboard-right">
            <div className="admin-dashboard-right-container">
              <div className="find-add-product">
                <input
                  type="text"
                  className="find-product-ip"
                  value={searchValue}
                  onChange={this.handleInputChange}
                ></input>
                <button
                  className="find-product-btn general-btn"
                  onClick={this.searchProduct}
                >
                  Search
                </button>
                <a
                  href="/admin/dashboard/add-product"
                  className="add-product-link general-btn"
                >
                  Add new product
                </a>
              </div>
              <div className="product-table-container">
                <table>
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>URL</th>
                      <th>Custom detail</th>
                      <th>Action</th>
                    </tr>
                    {list.map((product) => {
                      const { id } = product;
                      const b64 = new Buffer(product.imageUrl).toString(
                        "base64"
                      );
                      return (
                        <tr key={product.id}>
                          <td key={product.id}>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>3</td>

                          <td>
                            <img
                              className="image-product-admin"
                              src={`data:${product.imageUrl};base64,${b64}`}
                              alt="product"
                            />
                          </td>

                          <td>
                            <a
                              href={`/admin/dashboard/custom-product/id=${id}`}
                              className="admin-custom-product-link"
                            >
                              edit
                            </a>
                          </td>
                          <td>
                            <button
                              onClick={() => this.deleteProduct(id)}
                              className="admin-delete-product-btn"
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
          </Col>
        )}
      </>
    );
  }
}

export default ProductManage;
