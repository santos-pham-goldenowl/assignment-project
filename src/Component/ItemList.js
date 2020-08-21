import React from "react";
import Item from "./Item";

class ItemList extends React.Component {
  render() {
    const { productList } = this.props;
    return productList.map((product) => (
      <Item src={product.src} name={product.name} price={product.price} />
    ));
  }
}
export default ItemList;
