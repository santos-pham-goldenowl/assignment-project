import React from "react";
import Item from "../Component/Item/Item";

class ItemList extends React.Component {
  render() {
    const { productList } = this.props;
    return productList.map((product, index) => (
      <Item
        key={index}
        id={product.id}
        src={product.src}
        name={product.name}
        price={product.price}
      />
    ));
  }
}
export default ItemList;
