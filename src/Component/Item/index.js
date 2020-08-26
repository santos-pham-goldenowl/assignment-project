import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

class Item extends React.Component {
  render() {
    const { id, src, name, price } = this.props;
    console.log(id);
    return (
      <Col className="product">
        <div className="product-container">
          <Link to={`/product/${id}`} className="product-img">
            <img src={src} alt="can not display"></img>
          </Link>
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
