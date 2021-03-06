import React from "react";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";

import "./style.css";
import HelmetComp from "../../Component/Helmet";
import Product from "../../Component/Product";
import Select from "../../Component/Select";
import { AddItem } from "../../redux/action";
import httpLayer from "../../httpLayer";
import { headerToken } from "../../utilities";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionNameList: [
        {
          id: 1,
          name: "Laptop Category",
        },
        {
          id: 2,
          name: "Tablet Categroy",
        },
        {
          id: 3,
          name: "Mobile Categroy",
        },
        {
          id: 4,
          name: "Price: Low to high",
        },
        {
          id: 5,
          name: "Price: Hight to low",
        },
      ],
      valueSelect: "1",
      productList: [],
    };
  }

  async componentDidMount() {
    const token = await headerToken();
    httpLayer.get("/api/products", token).then((response) => {
      console.log("response: ", response);
      const { productList } = response.data;
      this.setState({
        productList,
      });
    });
  }

  addItem = (...arg) => {
    const countInCart = document.getElementById("count-selected-item");
    // - Convert arguments array to an object
    const properties = Object.assign({}, arg);

    // - Convert properties object to an object with keys in temp array respectively.
    const temp = ["id", "imageUrl", "name", "color", "price"];

    temp.forEach((item, index) => {
      properties[item] = properties[index.toString()];
      delete properties[index];
    });
    // ==========

    return () => {
      // add scale cart effect when click and then remove that class
      if (countInCart) {
        countInCart.classList.add("scale");
        setTimeout(() => {
          countInCart.classList.remove("scale");
        }, 1001);
      }

      this.props.addItem(properties);
    };
  };

  handleOnChange = (e) => {
    const { value } = e.target;
    this.setState({
      valueSelect: value,
    });
  };
  // - filter action when select
  filter = async () => {
    const token = await headerToken();
    const { valueSelect } = this.state;

    token.headers.filtertype = valueSelect;
    httpLayer.get("/api/products/filter", token).then((response) => {
      const { results } = response.data;
      this.setState({
        productList: results,
      });
    });
  };

  render() {
    const { productList } = this.state;
    // debugger;
    return (
      <div className="main-container">
        <HelmetComp title={"Home"} />
        <Container className="product-list-container">
          <Row>
            <div className="filter">
              <div className="filter-select">
                <Select
                  optionNameList={this.state.optionNameList}
                  handleOnChange={this.handleOnChange}
                />
              </div>
              <div className="filter-btn">
                <button onClick={this.filter}>Filter</button>
              </div>
            </div>
          </Row>
          <Row className="product-list-row">
            {productList.map((product) => {
              const tempUrl = product.imageUrl.split(",").map(String);
              const imgUrl = "http://localhost:3002/images/" + tempUrl[0];
              return (
                <Product
                  key={product.id}
                  id={product.id}
                  url={imgUrl}
                  color={product.color}
                  name={product.name}
                  price={product.price}
                  addItem={this.addItem(
                    product.id,
                    product.imageUrl,
                    product.name,
                    product.color,
                    product.price
                  )}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productList: state.ProductListReducer,
    user: state.UserReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (properties) => dispatch(AddItem(properties)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
