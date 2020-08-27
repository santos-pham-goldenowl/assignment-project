import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

class Product extends React.Component {
  render() {
    const { id, src, name, price, addItem } = this.props;
    return (
      <Col className="product">
        <div className="product-container">
          <Link to={`/product/${id}`} className="product-img">
            <img src={src} alt="can not display"></img>
          </Link>
          <p className="product-name">{name}</p>
          <p className="product-price">{price}</p>
          <div className="product-add-to-cart">
            <button className="product-add-to-cart-btn" onClick={addItem}>
              Add to cart
            </button>
          </div>
        </div>
      </Col>
    );
  }
}

export default Product;
