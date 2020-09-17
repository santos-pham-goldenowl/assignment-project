import Models from "@models";

class ProductService {
  // - create a new product
  create(product) {
    return Models.Products.create(product);
  }

  // - get a product
  getProduct(id) {
    return Models.Products.findOne({
      where: {
        id,
      },
    });
  }

  getCategoryList(category) {
    return Models.Products.findAll({
      where: { category },
    });
  }
}

export default new ProductService();
