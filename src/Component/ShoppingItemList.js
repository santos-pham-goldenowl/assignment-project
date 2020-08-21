import React from "react";
import ShoppingItem from "./ShoppingItem";

class ShoppingItemList extends React.Component {
  render() {
    return (
      <div className="shopping-infor">
        <h3 className="shopping-infor-title">Shopping Information</h3>
        <div className="shopping-item-list-container">
          <ShoppingItem itemName="Asus" countItem="1" priceSum="30000" />
          <ShoppingItem itemName="Hp" countItem="2" priceSum="20000" />
          <ShoppingItem itemName="Hp" countItem="2" priceSum="20000" />
          <ShoppingItem itemName="Hp" countItem="2" priceSum="20000" />
          <ShoppingItem itemName="Hp" countItem="2" priceSum="20000" />
          <ShoppingItem itemName="Hp" countItem="2" priceSum="20000" />
          <ShoppingItem itemName="Hp" countItem="2" priceSum="20000" />
        </div>
        <p className="shopping-total-price">Total: 0</p>
        <div className="checkout-shopping">
          <button className="checkout-shopping-btn">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    );
  }
}

export default ShoppingItemList;
