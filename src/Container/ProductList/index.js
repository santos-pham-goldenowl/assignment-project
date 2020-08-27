import React from "react";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";

import "./style.css";
import HelmetComp from "../../Component/Helmet";
import Product from "../../Component/Product/index";
import Select from "../../Component/Select/index";
import { AddItem, LowToHigh } from "../../redux/action/index";

class ProductList extends React.Component {
  addItem = (...arg) => {
    const argValue = arg;
    // - Convert arguments array to an object
    const properties = Object.assign({}, argValue);

    // - Convert properties object to an object with keys in temp array respectively.
    const temp = ["id", "src", "name", "price"];
    temp.forEach((item, index) => {
      properties[item] = properties[index.toString()];
      delete properties[index];
    });

    return () => {
      this.props.addItem(properties);
    };
  };

  handleOnChange = (e) => {
    const valueSelect = e.target.value;
    if (valueSelect === "Price: Low to high") {
      this.props.lowToHigh(valueSelect);
    }
    console.log(e.target.value);
  };

  render() {
    const { productList } = this.props;
    // debugger;
    return (
      <div className="main-container">
        <HelmetComp title={"Home"} />
        <Container className="product-list-container">
          <Row>
            <Select
              optionNameList={[
                {
                  id: 1,
                  name: "Category A",
                },
                {
                  id: 2,
                  name: "Categroy B",
                },
                {
                  id: 3,
                  name: "Price: Low to high",
                },
                {
                  id: 4,
                  name: "Price: Hight to low",
                },
              ]}
              handleOnChange={this.handleOnChange}
              inputValue={"Filter"}
            />
          </Row>
          <Row className="product-list-row">
            {productList.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                src={product.src}
                name={product.name}
                price={product.price}
                addItem={this.addItem(
                  product.id,
                  product.src,
                  product.name,
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
    lowToHigh: (value) => dispatch(LowToHigh(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
