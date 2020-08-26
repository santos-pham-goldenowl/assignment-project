import React from "react";
import { withRouter } from "react-router-dom";

import "./style.css";
import Slider from "../../Component/Carousel/Slider";

class ProductView extends React.Component {
  componentDidMount() {
    // const id = this.props.match.params.id;
    // -Call Api to get data by id
  }
  render() {
    return (
      <div>
        <div className="product-view-container">
          <div className="product-view-name">Acer</div>
          <div className="product-view">
            <div className="product-view-img"></div>
            <div className="product-view-action">
              <div className="product-view-price">
                <p>10.000.000</p>
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
          <Slider />
        </div>
      </div>
    );
  }
}

export default withRouter(ProductView);
