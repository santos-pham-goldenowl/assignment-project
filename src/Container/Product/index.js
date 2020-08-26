import React from "react";
import { Container, Row } from "reactstrap";

import "./style.css";
import HelmetComp from "../../Component/Helmet";
import ItemList from "../ItemList";
import Select from "../../Component/Select/index";

const productList = [
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
  {
    id: 9,
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    id: 10,
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    id: 11,
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    id: 12,
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
      productList: [],
    };
  }

  componentDidMount() {
    this.setState({
      productList: productList,
    });
  }

  render() {
    const { productList } = this.state;
    return (
      <div className="main-container">
        <HelmetComp title={"Home"} />
        <Container className="product-list-container">
          <Row>
            <Select
              optionNameList={[
                {
                  id: 1,
                  name: "Category A",
                },
                {
                  id: 2,
                  name: "Categroy B",
                },
                {
                  id: 3,
                  name: "Price: Low to high",
                },
                {
                  id: 4,
                  name: "Price: Hight to low",
                },
              ]}
              inputValue={"Filter"}
            />
          </Row>
          <Row className="product-list-row">
            <ItemList productList={productList} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Product;
