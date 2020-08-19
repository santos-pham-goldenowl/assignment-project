import React from "react";
import { Container, Row, Col } from "reactstrap";

import "../Style/Product.css";
const productList = [
  {
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    name: "Thickpad laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/2/27/637183901495990470_hp-348-g7-bac-dd.png",
    price: "22.000.0000",
  },
  {
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    name: "Thickpad laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/2/27/637183901495990470_hp-348-g7-bac-dd.png",
    price: "22.000.0000",
  },
  {
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    name: "Thickpad laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/2/27/637183901495990470_hp-348-g7-bac-dd.png",
    price: "22.000.0000",
  },
];
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: productList,
    };
  }
  render() {
    return (
      <div className="main-container">
        <Container className="product-list-container">
          <Row>
            <form action="" className="filter-form">
              <select name="cars" id="cars">
                <option value="volvo">Category A</option>
                <option value="saab">Category B</option>
                <option value="opel">Price: Low to high</option>
                <option value="audi">Price: High to low</option>
              </select>
              <br></br>
              <input type="submit" value="Filter"></input>
            </form>
          </Row>
          <Row className="product-list-row">
            {this.state.productList.map((product) => {
              return (
                <Col className="product">
                  <div className="product-container">
                    <div className="product-img">
                      <img src={product.src} alt="can not display"></img>
                    </div>
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{product.price}</p>
                    <div className="product-add-to-cart">
                      <button className="product-add-to-cart-btn">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Product;
