import React from "react";

import "./style.css";
import { connect } from "react-redux";
import { handlePrice } from "../../utilities";
import { changeQuantity } from "../../redux/action";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.quantityValue = React.createRef();
    this.increase = React.createRef();
    this.decrease = React.createRef();
  }

  componentDidMount() {
    let quantityValueNumber = +this.quantityValue.current.value;
    if (quantityValueNumber <= 1) {
      this.decrease.current.disabled = true;
    }
  }

  addItemCount = (id) => {
    this.decrease.current.disabled = false;
    let quantityValueNumber = +this.quantityValue.current.value;
    quantityValueNumber += 1;
    this.quantityValue.current.value = quantityValueNumber;
    const properties = changeQuantity(2, id);
    this.props.change(properties);
  };

  subtractItemCount = (id) => {
    let quantityValueNumber = +this.quantityValue.current.value;
    if (quantityValueNumber === 2) {
      quantityValueNumber = 1;
      this.decrease.current.disabled = true;
    } else {
      quantityValueNumber -= 1;
    }
    this.quantityValue.current.value = quantityValueNumber;
    const properties = changeQuantity(1, id);
    this.props.change(properties);
  };

  render() {
    const {
      id,
      name,
      imageUrl,
      color,
      quantity,
      price,
      removeSelectedItem,
    } = this.props;
    const displayPrice = handlePrice.formatPrice(price);
    const b64 = new Buffer(imageUrl).toString("base64");

    return (
      <>
        <tr>
          <td>
            <div className="product-name-img-container">
              <div className="product-name-img">
                <p className="ordered-product-name">{name}</p>
                <div className="product-img-cart-container">
                  <img
                    className="product-img-cart"
                    src={`data:${imageUrl};base64,${b64}`}
                    width="80px"
                    height="80px"
                    alt="Cannot display"
                  />
                </div>
              </div>
            </div>
          </td>
          <td>{color}</td>
          <td>
            <div>
              <button
                ref={this.increase}
                onClick={() => this.addItemCount(id)}
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
                ref={this.decrease}
                onClick={() => this.subtractItemCount(id)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    change: (properties) => dispatch(properties),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
