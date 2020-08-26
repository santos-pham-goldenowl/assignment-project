import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ShoppingItem from "../Component/ShoppingItem/ShoppingItem";

class ShoppingItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingItemList: [],
    };
  }
  componentDidMount() {
    this.setState({
      shoppingItemList: this.props.shoppingList,
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
          <div className="empty-cart"></div>
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

const mapStateToProps = (state) => {
  return {
    shoppingList: state.ShoppingListReducer,
  };
};

export default connect(mapStateToProps, null)(ShoppingItemList);
