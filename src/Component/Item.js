import React from "react";
import { Col } from "reactstrap";

class Item extends React.Component {
  render() {
    const { src, name, price } = this.props;
    return (
      <Col className="product">
        <div className="product-container">
          <div className="product-img">
            <img src={src} alt="can not display"></img>
          </div>
          <p className="product-name">{name}</p>
          <p className="product-price">{price}</p>
          <div className="product-add-to-cart">
            <button className="product-add-to-cart-btn">Add to cart</button>
          </div>
        </div>
      </Col>
    );
  }
}

export default Item;
