import Models from '@models';

class ProductService {
  create(product) {
    return Models.Products.create(product);
  }
}

export default new ProductService();