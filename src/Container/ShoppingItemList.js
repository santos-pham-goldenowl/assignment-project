import React from "react";
import { Link } from "react-router-dom";

import ShoppingItem from "../Component/ShoppingItem/ShoppingItem";
import EmptyCart from "../Component/Cart/EmptyCart";

const shoppingItemList = [
  {
    id: 1,
    name: "Asus",
    price: 20000,
  },
  {
    id: 2,
    name: "Asus",
    price: 20000,
  },
  {
    id: 3,
    name: "Asus",
    price: 20000,
  },
  {
    id: 4,
    name: "Asus",
    price: 20000,
  },
  {
    id: 5,
    name: "Asus",
    price: 20000,
  },
  {
    id: 6,
    name: "Asus",
    price: 20000,
  },
  {
    id: 7,
    name: "Asus",
    price: 20000,
  },
];
class ShoppingItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingItemList: [],
    };
  }
  componentDidMount() {
    this.setState({
      shoppingItemList: shoppingItemList,
    });
  }
  render() {
    const { shoppingItemList } = this.state;
    return (
      <div className="shopping-infor">
        {true ? (
          <div>
            <div className="shopping-item-list-container">
              {shoppingItemList.map((shoppingItem) => (
                <ShoppingItem
                  key={shoppingItem.id}
                  itemName={shoppingItem.name}
                  countItem="1"
                  priceSum={shoppingItem.price}
                />
              ))}
            </div>
            <p className="shopping-total-price">Total: 0</p>
          </div>
        ) : (
          <EmptyCart />
        )}
        <div className="checkout-shopping">
          <Link to="/cart" className="checkout-shopping-btn">
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingItemList;
