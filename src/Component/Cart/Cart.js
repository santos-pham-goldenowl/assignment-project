import React from "react";
import { Link } from "react-router-dom";

import "./Cart.css";

class Cart extends React.Component {
  render() {
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
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>
                <div className="name-img-product">
                  <p className="ordered-product-name">Dell</p>
                  <div className="product-img">
                    <img
                      src="https://cdn.tgdd.vn/Products/Images/44/218439/hp-348-g7-i5-9ph06pa-kg2-1-218439-400x400.jpg"
                      width="80px"
                      height="80px"
                      alt="Can not display"
                    ></img>
                  </div>
                </div>
              </td>
              <td>Black</td>
              <td>42</td>
              <td>
                <div>
                  <button>+</button>
                  <input
                    type="text"
                    value="1"
                    className="change-numberof-item-ip"
                  ></input>
                  <button>-</button>
                  <button className="remove-item-btn">Remove</button>
                </div>
              </td>
              <td>$500</td>
            </tr>
            <tr>
              <td>
                <div className="name-img-product">
                  <p className="ordered-product-name">Asus</p>
                  <div className="product-img">
                    <img
                      src="https://cdn.tgdd.vn/Products/Images/44/225808/dell-vostro-3590-i5-grmgk3-225520-055537-400x400.jpg"
                      width="80px"
                      height="80px"
                      alt="Can not display"
                    ></img>
                  </div>
                </div>
              </td>
              <td>White</td>
              <td>L</td>
              <td>
                <div>
                  <button>+</button>
                  <input
                    type="text"
                    value="2"
                    className="change-numberof-item-ip"
                  ></input>
                  <button>-</button>
                  <button className="remove-item-btn">Remove</button>
                </div>
              </td>
              <td>$300</td>
            </tr>
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
