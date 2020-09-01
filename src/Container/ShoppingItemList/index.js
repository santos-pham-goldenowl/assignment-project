import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import ShoppingItem from "../../Component/ShoppingItem/index";
import { sumPrice } from "../../utilities";
import { RemoveItem, HandlePopUp } from "../../redux/action";

class ShoppingItemList extends React.Component {
  constructor(props) {
    super(props);
    this.shoppingListRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOnOff);
  }

  // - handle popup component
  handleOnOff = (e) => {
    const { current } = this.shoppingListRef;
    const { target } = e;
    const cartIcon = document.getElementById("cart");
    if (current && !current.contains(target) && target !== cartIcon) {
      this.props.handlePopUp();
    }
  };

  removeItem = (id) => {
    return () => {
      this.props.removeItem(id);
    };
  };

  proceedCheckout = () => {
    const { history, handlePopUp } = this.props;
    history.push("/cart");
    handlePopUp();
  };

  render() {
    const { props } = this;
    const { shoppingList } = props.shoppingItemList;
    return (
      <div ref={this.shoppingListRef} className="shopping-infor">
        {/* - Render shopping item componnents */}
        {shoppingList.length ? (
          <div>
            <div className="shopping-item-list-container">
              {shoppingList.map((shoppingItem) => (
                <ShoppingItem
                  key={shoppingItem.id}
                  url={shoppingItem.url}
                  itemName={shoppingItem.name}
                  countItem={shoppingItem.count}
                  itemPrice={shoppingItem.price}
                  removeItem={this.removeItem(shoppingItem.id)}
                />
              ))}
            </div>
            <p className="shopping-total-price">Total: {sumPrice(props)}</p>
          </div>
        ) : (
          <div className="empty-cart-container">
            <div className="empty-cart"></div>
          </div>
        )}
        <div className="checkout-shopping">
          <button
            onClick={this.proceedCheckout}
            className={
              shoppingList.length
                ? "checkout-shopping-btn"
                : "checkout-shopping-btn disable"
            }
          >
            PROCEED TO CHECKOUT
          </button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => dispatch(RemoveItem(id)),
    handlePopUp: () => dispatch(HandlePopUp()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingItemList)
);
