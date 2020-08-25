import React from "react";

class ShoppingItem extends React.Component {
  render() {
    const { itemName, countItem, priceSum } = this.props;
    return (
      <div className="shopping-item-container">
        <div className="shopping-item">
          <div className="shopping-item-img"></div>
          <div className="shopping-item-name">{itemName}</div>
          <div className="item-price-count">
            <div>{countItem}</div>
            <div>{priceSum}</div>
          </div>
          <div className="remove-item">
            <button>X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingItem;
