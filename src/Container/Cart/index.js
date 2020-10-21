import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CartItem from "../../Component/CartItem/index";
import { RemoveItem } from "../../redux/action";
import { handlePrice, headerToken } from "../../utilities/index";
import httpLayer from "../../httpLayer/index";

import "./style.css";

class Cart extends React.Component {
  // - Remove selected item
  removeSelectedItem = (id) => {
    return () => this.props.removeItem(id);
  };

  async checkOut(list) {
    // const token = localStorage.getItem("token");
    // console.log("list: ", list);
    const token = await headerToken();

    httpLayer
      .post(
        "/api/checkout",
        {
          data: {
            list: list,
          },
        },
        token
      )
      .then(() => {
        localStorage.removeItem("shoppingList");
        this.props.history.push("/");
      })
      .catch((err) => console.log("err: ", err));
    this.props.history.push("/");
  }

  render() {
    const { props } = this;
    const { userId } = props.user;
    const { shoppingList } = props.shoppingItemList;

    const orderList = JSON.parse(localStorage.getItem("shoppingList"));
    const priceList = shoppingList.map((element) => {
      return element.price;
    });

    if (orderList) {
      orderList.map((element, index) => {
        return (element.price = priceList[index]);
      });
    }
    const checkoutInfor = {
      orderList,
      userId,
    };

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
                    id={selectedItem.id}
                    name={selectedItem.name}
                    imageUrl={selectedItem.imageUrl}
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
            <button
              className="checkout-btn"
              onClick={() => this.checkOut(checkoutInfor)}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer,
    shoppingItemList: state.ShoppingListReducer,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    removeItem: (id) => dispatch(RemoveItem(id)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
