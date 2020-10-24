import Models from "@models";
import { Op } from "sequelize";
import sequelize from "sequelize";

class ProductService {
  // - create a new product
  constructor() {
    this.ProductModels = Models.Products;
  }
  create(product) {
    return this.ProductModels.create(product);
  }

  getAllProduct(filter) {
    return this.ProductModels.findAll(filter);
  }

  getCount() {
    return this.ProductModels.count({
      distinct: "id",
    });
  }

  getProductByFilter(filter) {
    return this.ProductModels.findAll(filter);
  }

  // - get a product
  getProduct(id) {
    return this.ProductModels.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Models.Categories,
          as: "categoryAs",
        },
      ],
    });
  }

  custom(params) {
    const { id } = params;
    return this.ProductModels.update(params, {
      where: {
        id,
      },
    });
  }

  search(params) {
    return this.ProductModels.findAll({
      // where: {
      //   name: {
      //     [Op.like]: "%" + params + "%",
      //   },
      // },
      where: {
        name: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("name")),
          "LIKE",
          "%" + params.toLowerCase() + "%"
        ),
      },
    });

    // return this.ProductModels.findAll({
    //   limit: 10,
    //   where: {
    //     name: sequelize.where(
    //       sequelize.fn("LOWER", sequelize.col("name")),
    //       "LIKE",
    //       params.toLowerCase()
    //     ),
    //   },
    // });
  }

  delete(id) {
    return this.ProductModels.destroy({
      truncate: true,
      restartIdentity: true,
      where: {
        id,
      },
    });
  }

  getCategoryList(category) {
    return this.ProductModels.findAll({
      where: { category },
    });
  }
}

export default new ProductService();
