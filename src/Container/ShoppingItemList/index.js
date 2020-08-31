import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import ShoppingItem from "../../Component/ShoppingItem/index";
import { RemoveItem, HandlePopUp } from "../../redux/action";
import handlePrice from "../../utilities";

class ShoppingItemList extends React.Component {
  constructor(props) {
    super(props);
    this.shoppingListRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOnOff);
  }

  // handle popup component
  handleOnOff = (e) => {
    const { current } = this.shoppingListRef;
    const { target } = e;
    const cartIcon = document.getElementById("cart");
    if (current && !current.contains(target) && target !== cartIcon) {
      console.log("matched");
      this.props.handlePopUp();
    }
  };

  //calculate sum the price of all selected items
  sumPrice = () => {
    const { shoppingList } = this.props.shoppingItemList;
    const sumPrice = shoppingList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.count;
    }, 0);

    return handlePrice(sumPrice);
  };

  removeItem = (id) => {
    return () => {
      this.props.removeItem(id);
    };
  };

  render() {
    const { shoppingList } = this.props.shoppingItemList;
    return (
      <div ref={this.shoppingListRef} className="shopping-infor">
        {/* - Render shopping item componnents */}
        {shoppingList.length ? (
          <div>
            <div className="shopping-item-list-container">
              {shoppingList.map((shoppingItem) => (
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
          <div className="empty-cart-container">
            <div className="empty-cart"></div>
          </div>
        )}
        <div className="checkout-shopping">
          <Link
            to="/cart"
            className={
              shoppingList.length
                ? "checkout-shopping-btn"
                : "checkout-shopping-btn disable"
            }
          >
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
    handlePopUp: () => dispatch(HandlePopUp()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemList);
