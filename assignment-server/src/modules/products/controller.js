import { ProductService } from "@services";

class ProductController {
  constructor() {
    this.ProductService = ProductService;
  }
  async getProductList(req, res, next) {
    try {
      const { ids } = req.query;
      const queryIds = ids ? ids.split(",") : null;
      let filter = {};

      if (queryIds && queryIds.length) {
        filter = {
          where: {
            id: ids.split(","),
          },
        };
      }

      // - filter
      const { filtertype } = req.headers;

      if (filtertype) {
        const filterPriceValue = this.filterProductByPrice(filtertype);

        const filterCategoryValue = this.filterProductByCategory(filtertype);
        if (filterPriceValue) {
          filter = {
            order: [["price", filterPriceValue]],
          };
        } else if (filterCategoryValue) {
          filter = {
            where: {
              category: +filterCategoryValue,
            },
          };
        }
      }

      const results = await ProductService.findAllProduct(filter);
      return res.json({
        success: true,
        results,
      });
    } catch (err) {
      next(err);
    }
  }

  filterProductByCategory(value) {
    switch (value) {
      case "1":
        return "1";
      case "2":
        return "2";
      default:
        return null;
    }
  }

  filterProductByPrice(value) {
    switch (value) {
      case "3":
        return "ASC";
      case "4":
        return "DESC";
      default:
        return null;
    }
  }

  async getProduct(req, res, next) {
    const { id } = req.params;
    console.log("id: ", id);
    const product = await ProductService.getProduct(id);

    res.json({
      success: true,
      result: product,
    });
  }

  async getCategoryList(req, res, next) {
    const { category } = req.params;
    const categoryList = await ProductService.getCategoryList(category);

    res.json({
      success: true,
      result: categoryList,
    });
  }

  async createProduct(req, res, next) {
    try {
      const params = req.body || null;
      const result = await this.ProductService.create(params);

      res.json({
        success: true,
        result: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();
