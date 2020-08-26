import React from "react";
import "./style.css";

class CartItem extends React.Component {
  render() {
    const { name, url, color, size, quantity, price } = this.props;
    return (
      <>
        <tr>
          <td>
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
          </td>
          <td>{color}</td>
          <td>{size}</td>
          <td>
            <div>
              <button>+</button>
              <input
                type="text"
                defaultValue={quantity}
                className="change-numberof-item-ip"
              ></input>
              <button>-</button>
              <button className="remove-item-btn">Remove</button>
            </div>
          </td>
          <td>{price}</td>
        </tr>
      </>
    );
  }
}

export default CartItem;
