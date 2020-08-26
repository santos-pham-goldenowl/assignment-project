import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../../Component/CartItem/index";

import "./style.css";

const selectedItemList = [
  {
    name: "Dell",
    url:
      "https://cdn.tgdd.vn/Products/Images/44/218439/hp-348-g7-i5-9ph06pa-kg2-1-218439-400x400.jpg",
    color: "black",
    size: "M",
    quantity: 1,
    price: "$500",
  },
  {
    name: "Asus",
    url:
      "https://cdn.tgdd.vn/Products/Images/44/225808/dell-vostro-3590-i5-grmgk3-225520-055537-400x400.jpg",
    color: "white",
    size: "L",
    quantity: 3,
    price: "$900",
  },
];

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemList: [],
    };
  }
  componentDidMount() {
    this.setState({
      selectedItemList,
    });
  }
  render() {
    const { selectedItemList } = this.state;
    return (
      <div className="cart-page">
        <div className="back-home-container">
          <Link to="/" className="back-home-link">
            Back to shopping
          </Link>
        </div>
        <div className="title-cart-list">
          <p>ITEMS LIST HAS BEEN ADDED TO YOUR SHOPPING BAG</p>
        </div>
        <div className="product-list">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {selectedItemList.map((selectedItem, index) => {
                return (
                  <CartItem
                    key={index}
                    name={selectedItem.name}
                    url={selectedItem.url}
                    color={selectedItem.color}
                    size={selectedItem.size}
                    quantity={selectedItem.quantity}
                    price={selectedItem.price}
                  />
                );
              })}
            </tbody>
          </table>
          <div>
            <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
