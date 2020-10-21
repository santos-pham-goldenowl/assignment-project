import { ProductService } from "@services";

class ProductController {
  constructor() {
    this.ProductService = ProductService;
  }

  async getProductList(req, res, next) {
    try {
      // const { ids } = req.query;
      // const queryIds = ids ? ids.split(",") : null;
      // let filter = {};

      // if (queryIds && queryIds.length) {
      //   filter = {
      //     where: {
      //       id: ids.split(","),
      //     },
      //   };
      // }
      const results = await ProductService.findAllProduct();
      return res.json({
        success: true,
        results,
      });
    } catch (err) {
      next(err);
    }
  }

  // - Get product list by filter

  async getProductListByFilter(req, res, next) {
    try {
      // - filter by cateogry and price
      let filter = {};
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

      const results = await ProductService.getProductByFilter(filter);
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
      case "3":
        return "3";
      default:
        return null;
    }
  }

  filterProductByPrice(value) {
    switch (value) {
      case "4":
        return "ASC";
      case "5":
        return "DESC";
      default:
        return null;
    }
  }

  async getProductListByPagination(req, res, next) {
    try {
      const { currentPage } = req.params;
      const offset = currentPage * 10;
      const filter = {
        offset,
        limit: 10,
      };
      const productList = await ProductService.getByPagination(filter);
      const count = await ProductService.getCount();

      res.json({
        success: true,
        productList,
        count,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProduct(id);

      res.json({
        success: true,
        result: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async getCategoryList(req, res, next) {
    try {
      const { category } = req.params;
      const categoryList = await ProductService.getCategoryList(category);

      res.json({
        success: true,
        result: categoryList,
      });
    } catch (err) {
      next(err);
    }
  }

  async createProduct(req, res, next) {
    try {
      // const params = req.body || null;
      // const {
      //   name,
      //   imageUrl,
      //   price,
      //   color,
      //   category,
      //   currency,
      // } = req.body.values;
      console.log("res.body: ", req.body);

      // const result = await this.ProductService.create({
      //   name,
      //   imageUrl,
      //   price,
      //   color,
      //   category,
      //   currency,
      // });
      // res.json({
      //   success: true,
      //   result: result,
      // });
    } catch (err) {
      next(err);
    }
  }

  async searchProduct(req, res, next) {
    try {
      const { params } = req.body;
      const assets = await ProductService.search(params);

      return res.json({
        success: true,
        assets: assets,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.body;
      await ProductService.delete(id);
      const results = await ProductService.findAllProduct();
      return res.json({
        success: true,
        results,
      });
    } catch (err) {
      next(err);
    }
  }

  async customProduct(req, res, next) {
    try {
      const { values } = req.body;
      const customedProduct = await ProductService.custom(values);
      res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();
