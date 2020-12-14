import { ProductService } from "@services";

class ProductController {
  constructor() {
    this.ProductService = ProductService;
  }

  async getProductList(req, res, next) {
    try {
      let filter = {};
      if (req.query) {
        if (req.query.ids) {
          // get product by id list of shopping
          const { ids } = req.query;
          const queryIds = ids ? ids.split(",") : null;
          if (queryIds && queryIds.length) {
            filter = {
              where: {
                id: queryIds,
              },
            };
          }
        } else if (req.query.page) {
          // get product by pagination
          const { page } = req.query;
          const offset = page * 10;
          filter = {
            offset,
            limit: 10,
          };
        }
      }

      const productList = await ProductService.getAllProduct(filter);
      const count = await ProductService.getCount();

      return res.json({
        success: true,
        count,
        productList,
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
      const params = req.body || null;
      const { name, price, color, category, currency } = req.body;
      // const imageUrl = req.file.buffer;

      let imageUrl = "";
      req.files.forEach((file, index) => {
        if (index === 0) {
          imageUrl = file.filename;
        } else {
          imageUrl = imageUrl + "," + file.filename;
        }
      });

      const result = await this.ProductService.create({
        name,
        imageUrl,
        price,
        color,
        category,
        currency,
      });

      res.json({
        success: true,
        result: result,
      });
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
      // const results = await ProductService.getAllProduct();
      return res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async customProduct(req, res, next) {
    try {
      const { id, name, price, color, category, currency, oldValue } = req.body;
      // const imageUrl = req.file.buffer;
      console.log("req.files: ", req.files[0]);
      console.log("req.body: ", req.body);
      // const b64 = new Buffer(url).toString("base64");
      console.log(req.files[0] === true);

      let newImageUrl = "",
        imageUploadList,
        oldImageList;
      if (req.files[0]) {
        console.log("Matched");
        req.files.forEach((file, index) => {
          console.log("Matched v2");
          if (index === 0) {
            imageUploadList = file.filename;
          } else {
            imageUploadList = imageUploadList + "," + file.filename;
          }
        });
      }
      if (oldValue) {
        const newValue = oldValue.split(",").map(String);
        console.log("newValue: ", newValue);
        newValue.forEach((item, index) => {
          if (index === 0) {
            oldImageList = item;
          } else {
            oldImageList = oldImageList + "," + item;
          }
        });
      }
      if (imageUploadList) {
        newImageUrl = imageUploadList + "," + oldImageList;
      } else {
        newImageUrl = oldImageList;
      }
      console.log("newImageUrl: ", newImageUrl);

      const result = await this.ProductService.custom({
        id,
        name,
        imageUrl: newImageUrl,
        price,
        color,
        category,
        currency,
      });

      // const customedProduct = await ProductService.custom(values);
      res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();
