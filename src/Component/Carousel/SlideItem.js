import React from "react";

class SlideItem extends React.Component {
  render() {
    const { name, src, price, st } = this.props;
    return (
      <div className="slide-item" style={st}>
        <p className="slide-item-name">{name}</p>
        {/* <div
          className="slide-item-img"
          style={{ backgroundImage: `url("${src}")` }}
        ></div> */}
        <div className="slide-item-img">
          <img src={`${src}`} alt="Can not display"></img>
        </div>
        <div className="slide-item-price">{price}</div>
      </div>
    );
  }
}

export default SlideItem;
