import React from "react";
import "./index.css";
import SlideItem from "./SlideItem";

const relatedProductList = [
  {
    id: 1,
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    id: 2,
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    id: 3,
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    id: 4,
    name: "Thinkpad laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/2/27/637183901495990470_hp-348-g7-bac-dd.png",
    price: "22.000.0000",
  },
  {
    id: 5,
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    id: 6,
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    id: 7,
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    id: 8,
    name: "Thinkpad laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/2/27/637183901495990470_hp-348-g7-bac-dd.png",
    price: "22.000.0000",
  },
];
export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      relatedProductList: [],
    };
  }
  componentDidMount() {
    this.setState({
      relatedProductList,
    });
  }
  goLeft = () => {
    const { x } = this.state;
    x === 0
      ? this.setState({
          x: -100 * (relatedProductList.length - 4),
        })
      : this.setState({ x: x + 100 });
  };
  goRight = () => {
    const { x } = this.state;
    x === -100 * (relatedProductList.length - 4)
      ? this.setState({ x: 0 })
      : this.setState({ x: x - 100 });
  };

  render() {
    const { x } = this.state;
    let style = {
      transform: `translateX(${x}%)`,
    };
    return (
      <div className="slider">
        <p className="slider-title">Related Product</p>
        <div className="slide">
          {relatedProductList.map((item, index) => {
            return (
              <SlideItem
                key={index}
                name={item.name}
                src={item.src}
                price={item.price}
                st={style}
              />
            );
          })}
        </div>
        <button onClick={this.goLeft} class="slide-btn" id="go-left"></button>
        <button onClick={this.goRight} class="slide-btn" id="go-right"></button>
      </div>
    );
  }
}
