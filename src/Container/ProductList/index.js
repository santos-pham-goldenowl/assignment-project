import React from "react";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";

import "./style.css";
import HelmetComp from "../../Component/Helmet";
import Product from "../../Component/Product/index";
import Select from "../../Component/Select/index";
import { AddItem, Filter } from "../../redux/action/index";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionNameList: [
        {
          id: 1,
          name: "Mobile Category",
        },
        {
          id: 2,
          name: "Tablet Categroy",
        },
        {
          id: 3,
          name: "Price: Low to high",
        },
        {
          id: 4,
          name: "Price: Hight to low",
        },
      ],
      valueSelect: "1",
      productList: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const authToken = "Bearer " + token;
    const options = {
      headers: {
        Authorization: authToken,
      },
    };
    axios.get("/api/products", options).then((response) => {
      const { results } = response.data;
      this.setState({
        productList: results,
      });
    });
  }
  addItem = (...arg) => {
    const countInCart = document.getElementById("count-selected-item");

    const argValue = arg;
    // - Convert arguments array to an object
    const properties = Object.assign({}, argValue);

    // - Convert properties object to an object with keys in temp array respectively.
    const temp = ["id", "url", "name", "color", "price"];
    temp.forEach((item, index) => {
      properties[item] = properties[index.toString()];
      delete properties[index];
    });

    return () => {
      // add add to scale when click and then remove that class
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
  filter = () => {
    const { valueSelect } = this.state;
    const actionFilter = Filter(valueSelect);
    this.props.filter(actionFilter);
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
            {productList.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                url={product.image_url}
                color={product.color}
                name={product.name}
                price={product.price}
                addItem={this.addItem(
                  product.id,
                  product.image_url,
                  product.name,
                  product.color,
                  product.price
                )}
              />
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productList: state.ProductListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (properties) => dispatch(AddItem(properties)),
    filter: (value) => dispatch(value),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
