import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ShoppingItem from "../Component/ShoppingItem/index";
import { RemoveItem } from "../redux/action";

class ShoppingItemList extends React.Component {
  sumPrice = () => {
    // - Remove dot notation
    const removeDotNotation = (value) => {
      const regex = /[.]/g;
      return value.replace(regex, "");
    };

    const { shoppingItemList } = this.props;
    // - Get Sum of selected items' price
    const sumPrice = shoppingItemList.reduce((accumulator, currentValue) => {
      const numberPrice = removeDotNotation(currentValue.price);
      const convertPriceToNumber = +numberPrice;
      return accumulator + convertPriceToNumber * currentValue.count;
    }, 0);

    return sumPrice;
  };

  removeItem = (id) => {
    return () => {
      this.props.removeItem(id);
    };
  };

  render() {
    const { shoppingItemList } = this.props;
    return (
      <div className="shopping-infor">
        {/* - Render shopping item componnents */}
        {shoppingItemList.length ? (
          <div>
            <div className="shopping-item-list-container">
              {shoppingItemList.map((shoppingItem) => (
                <ShoppingItem
                  key={shoppingItem.id}
                  itemName={shoppingItem.name}
                  countItem={shoppingItem.count}
                  itemPrice={shoppingItem.price}
                  removeItem={this.removeItem(shoppingItem.id)}
                />
              ))}
            </div>
            <p className="shopping-total-price">Total: {this.sumPrice()}</p>
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
    shoppingItemList: state.ShoppingListReducer,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    removeItem: (id) => dispatch(RemoveItem(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemList);
