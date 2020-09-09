// import Models from '@models';
import { ProductService } from '@services';
// import Services from '@services';

class ProductController {
  constructor() {
    this.ProductService = ProductService;
  }
  async listProducts(req, res, next) {
    try {
      const results = await Models.Products.findAll();
      res.json({
        success: true,
        results: results,
      });
    } catch(err) {
      next(err);
    }
  }

  async createProduct(req, res, next) {
    try {
      const params = req.body || null;
      const result = await this.ProductService.create(params);

      res.json({
        success: true,
        result: result,
      });
    } catch(err) {
      next(err);
    }
  }
}

export default new ProductController();