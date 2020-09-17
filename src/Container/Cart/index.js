import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CartItem from "../../Component/CartItem/index";
import { RemoveItem } from "../../redux/action";
import { handlePrice } from "../../utilities/index";
import "./style.css";

class Cart extends React.Component {
  // - Remove selected item
  removeSelectedItem = (id) => {
    return () => this.props.removeItem(id);
  };
  render() {
    const { props } = this;
    const { shoppingList } = props.shoppingItemList;
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
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {shoppingList.map((selectedItem, index) => {
                return (
                  <CartItem
                    key={selectedItem.id}
                    name={selectedItem.name}
                    url={selectedItem.url}
                    color={selectedItem.color}
                    quantity={selectedItem.count}
                    price={selectedItem.price}
                    removeSelectedItem={this.removeSelectedItem(
                      selectedItem.id
                    )}
                  />
                );
              })}
              <tr>
                <th colSpan="3">Total</th>
                <th>{handlePrice.priceSum(props)}</th>
              </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
