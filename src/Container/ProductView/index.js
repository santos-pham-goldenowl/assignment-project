import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Slider from "../../Component/Carousel/Slider";
import { handlePrice, headerToken } from "../../utilities/index";
import httpLayer from "../../httpLayer";

import "./style.css";

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productSelected: "",
      relatedProductList: [],
      isFetching: true,
    };
  }
  async componentDidMount() {
    // -Call Api to get data by id
    const response = await this.getProduct();
    const product = response.result;

    // - Get categrory value of selecting product and call Api to get category list by it.
    const { category } = response.result;
    const categoryList = await this.getCategoryList(category);
    console.log("category list: ", categoryList);

    // - Set selected product on head of aray by insert selected product into the array
    //  - After that using reduce method to remove duplicate values after getting a new array with unique values.
    const newList = [...categoryList.result];
    newList.unshift(product);

    const relatedProductList = newList.reduce((accumulator, currentValue) => {
      const { id } = currentValue;
      const flag = accumulator.find((item) => item.id === id);
      if (!flag) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    const { imageUrl } = product;
    const b64 = new Buffer(imageUrl).toString("base64");
    // - product is representative for current product
    // - relatedProductList is reprentative for product list that relative with current value (Slide);
    this.setState({
      productSelected: product,
      relatedProductList,
      isFetching: false,
      b64,
    });
  }

  // - get product list
  async getProduct() {
    const id = this.props.match.params.id;
    const token = await headerToken();
    return await httpLayer.get(`/api/products/${id}`, token).then((res) => {
      return res.data;
    });
  }

  // get category list
  async getCategoryList(category) {
    const token = await headerToken();
    return await httpLayer
      .get(`/api/products/category/${category}`, token)
      .then((res) => {
        return res.data;
      });
  }

  render() {
    const { productSelected, relatedProductList, isFetching, b64 } = this.state;
    const { imageUrl, name, price } = productSelected;

    let displayPrice;
    if (price) {
      displayPrice = handlePrice.formatPrice(price);
    } else {
      displayPrice = "";
    }
    return (
      <>
        {!isFetching && (
          <div>
            <div className="product-view-container">
              <div className="product-view-name">{name}</div>
              <div className="product-view">
                <div className="product-view-img-container">
                  <div
                    className="product-view-img"
                    style={{
                      backgroundImage: `url("data:${imageUrl};base64,${b64}")`,
                    }}
                  ></div>
                </div>
                <div className="product-view-action">
                  <div className="product-view-price">
                    <p>{displayPrice}</p>
                  </div>
                  <div className="product-view-description">
                    <p>Description</p>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                  <div className="product-view-buy">
                    <button className="product-view-buy-btn">BUY</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-view-more-items">
              {relatedProductList && (
                <Slider
                  relatedProductList={relatedProductList}
                  currentProductId={this.props.match.params.id}
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList: state.ProductListReducer,
  };
};

export default withRouter(connect(mapStateToProps, null)(ProductView));
