import React from "react";

import { handlePrice } from "../../utilities/index";

class SlideItem extends React.Component {
  render() {
    const { id, name, url, price, st, currentProductId } = this.props;
    const displayPrice = handlePrice.formatPrice(price);
    // - set className, status name for current product
    const currentClassname =
      +currentProductId === id ? "slide-item current" : "slide-item";

    const currentStatus = +currentProductId === id ? "Exploring" : "";
    console.log("current status: ", currentStatus);
    return (
      <div className={currentClassname} style={st}>
        <p className="current-status">{currentStatus}</p>
        <p className="slide-item-name">{name}</p>
        <div className="slide-item-img">
          <img
            src={`${url}`}
            alt="Can not display"
            width="230"
            height="200"
          ></img>
        </div>
        <div className="slide-item-price">{displayPrice}</div>
      </div>
    );
  }
}

export default SlideItem;
