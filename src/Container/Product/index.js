import React from "react";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";

import "./style.css";
import HelmetComp from "../../Component/Helmet";
// import ItemList from "../ItemList/index";
import Item from "../../Component/Item/index";
import Select from "../../Component/Select/index";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    this.setState({
      productList: this.props.shoppingList,
    });
  }

  render() {
    const { productList } = this.state;
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
              inputValue={"Filter"}
            />
          </Row>
          <Row className="product-list-row">
            {productList.map((product, index) => (
              <Item
                key={index}
                id={product.id}
                src={product.src}
                name={product.name}
                price={product.price}
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
    shoppingList: state.ItemListReducer,
  };
}

export default connect(mapStateToProps, null)(Product);
