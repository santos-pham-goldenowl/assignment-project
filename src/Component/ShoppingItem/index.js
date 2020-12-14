import React from "react";
import { handlePrice } from "../../utilities";

import "./style.css";

class ShoppingItem extends React.Component {
  render() {
    const { imageUrl, itemName, countItem, itemPrice, removeItem } = this.props;
    const displayPrice = handlePrice.formatPrice(itemPrice);
    const b64 = new Buffer(imageUrl).toString("base64");
    return (
      <div className="shopping-item-container">
        <div className="shopping-item">
          <div
            className="shopping-item-img"
            style={{ backgroundImage: `url("data:${imageUrl};base64,${b64}")` }}
          ></div>
          <div className="shopping-item-name">{itemName}</div>
          <div className="item-price-count">
            <div>{countItem}</div>
            <div>{displayPrice}</div>
          </div>
          <div className="remove-item">
            <button onClick={removeItem}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingItem;
