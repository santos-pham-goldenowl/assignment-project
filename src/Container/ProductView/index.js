import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import Slider from "../../Component/Carousel/Slider";
import { handlePrice } from "../../utilities";

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      relatedProductList: [],
    };
  }
  componentDidMount() {
    // -Call Api to get data by id
    const id = this.props.match.params.id;

    // - Get productList from Redux, then find a product that have its id, after that find category by id.
    // - Finally, use filter method to get product list which has the same category.
    const { productList } = this.props;
    const product = productList.find((product) => product.id === id);
    const { category } = product;
    let newList = productList.filter(
      (product) => product.category === category
    );

    // - Set selected product on head of aray by insert selected product into the array
    // - After using Set() method to get unique product value.
    newList.unshift(product);
    const relatedProductList = Array.from(new Set(newList));
    this.setState({
      product,
      relatedProductList,
    });
  }

  render() {
    const { relatedProductList, product } = this.state;
    const { url, name, price } = product;
    let displayPrice;
    if (price) {
      displayPrice = handlePrice(price);
    } else {
      displayPrice = "";
    }
    return (
      <div>
        <div className="product-view-container">
          <div className="product-view-name">{name}</div>
          <div className="product-view">
            <div className="product-view-img-container">
              <div
                className="product-view-img"
                style={{ backgroundImage: `url("${url}")` }}
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
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList: state.ProductListReducer,
  };
};

export default withRouter(connect(mapStateToProps, null)(ProductView));
