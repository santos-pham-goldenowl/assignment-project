import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./style.css";

import { handlePrice } from "../../utilities/index";

class Product extends React.Component {
  render() {
    const { id, url, name, price, addItem } = this.props;
    const displayPrice = handlePrice.formatPrice(price);
    return (
      <Col className="product">
        <div className="product-container">
          <Link to={`/product/${id}`} className="product-img">
            <img src={url} alt="cannot display" width="230" height="200"></img>
          </Link>
          <p className="product-name">{name}</p>
          <p className="product-price">{displayPrice}</p>
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
