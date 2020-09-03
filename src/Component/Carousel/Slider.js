import React from "react";
import "./index.css";
import SlideItem from "./SlideItem";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
    };
  }
  goLeft = () => {
    const { x } = this.state;
    const { relatedProductList } = this.props;
    x === 0
      ? this.setState({
          x: -100 * (relatedProductList.length - 4),
        })
      : this.setState({ x: x + 100 });
  };
  goRight = () => {
    const { x } = this.state;
    const { relatedProductList } = this.props;
    x === -100 * (relatedProductList.length - 4)
      ? this.setState({ x: 0 })
      : this.setState({ x: x - 100 });
  };

  render() {
    const { x } = this.state;
    const { relatedProductList, currentProductId } = this.props;
    let style = {
      transform: `translateX(${x}%)`,
    };
    return (
      <div className="slider">
        <p className="slider-title">Related Product</p>
        <div className="slide">
          {relatedProductList.map((product) => {
            return (
              <SlideItem
                key={product.id}
                id={product.id}
                name={product.name}
                url={product.url}
                price={product.price}
                st={style}
                currentProductId={currentProductId}
              />
            );
          })}
        </div>
        <button onClick={this.goLeft} id="go-left"></button>
        <button onClick={this.goRight} id="go-right"></button>
      </div>
    );
  }
}
