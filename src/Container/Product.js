import React from "react";
import { Container, Row } from "reactstrap";
import HelmetComp from "../Component/Helmet";

import "../Style/Product.css";
import ItemList from "../Component/ItemList";
import Select from "../Component/Select";

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
    name: "Thinkpad laptop",
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
    name: "Thinkpad laptop",
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
    name: "Thinkpad laptop",
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
        <HelmetComp title={"Home"} />
        <Container className="product-list-container">
          <Row>
            <Select
              optionNameList={[
                "Category A",
                "Categroy B",
                "Price: Low to high",
                "Price: Hight to low",
              ]}
              inputValue={"Filter"}
            />
          </Row>
          <Row className="product-list-row">
            <ItemList productList={this.state.productList} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Product;
