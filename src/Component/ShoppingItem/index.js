import React from "react";
import handlePrice from "../../utilities";

import "./style.css";

class ShoppingItem extends React.Component {
  render() {
    const { src, itemName, countItem, itemPrice, removeItem } = this.props;
    console.log("src: ", src);
    const displayPrice = handlePrice(itemPrice);
    return (
      <div className="shopping-item-container">
        <div className="shopping-item">
          <div
            className="shopping-item-img"
            style={{ backgroundImage: `url("${src}")` }}
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
