import React from "react";

import "./style.css";
import { handlePrice } from "../../utilities/index";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.quantityValue = React.createRef();
  }

  addItemCount = () => {
    let quantityValueNumber = +this.quantityValue.current.value;
    quantityValueNumber += 1;
    this.quantityValue.current.value = quantityValueNumber;
  };
  subtractItemCount = () => {
    let quantityValueNumber = +this.quantityValue.current.value;
    if (quantityValueNumber === 0) {
      quantityValueNumber = 0;
    } else {
      quantityValueNumber -= 1;
    }
    this.quantityValue.current.value = quantityValueNumber;
  };

  render() {
    const {
      name,
      url,
      color,
      quantity,
      price,
      removeSelectedItem,
    } = this.props;
    const displayPrice = handlePrice.formatPrice(price);
    return (
      <>
        <tr>
          <td>
            <div className="product-name-img-container">
              <div className="product-name-img">
                <p className="ordered-product-name">{name}</p>
                <div className="product-img">
                  <img
                    src={url}
                    width="80px"
                    height="80px"
                    alt="Can not display"
                  ></img>
                </div>
              </div>
            </div>
          </td>
          <td>{color}</td>
          <td>
            <div>
              <button
                onClick={this.addItemCount}
                className="change-quantity-btn"
              >
                +
              </button>
              <input
                ref={this.quantityValue}
                type="text"
                defaultValue={quantity}
                className="change-numberof-item-ip"
              ></input>
              <button
                onClick={this.subtractItemCount}
                className="change-quantity-btn"
              >
                -
              </button>
              <button className="remove-item-btn" onClick={removeSelectedItem}>
                Remove
              </button>
            </div>
          </td>
          <td>{displayPrice}</td>
        </tr>
      </>
    );
  }
}

export default CartItem;
