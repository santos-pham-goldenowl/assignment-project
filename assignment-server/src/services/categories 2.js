import Models from "@models";

class CategoriesService {
  constructor() {
    this.Categories = Models.Categories;
  }

  getCategoryList() {
    return this.Categories.findAll();
  }

  createCategory(params) {
    return this.Categories.create(params);
  }

  getCategory(id) {
    return this.Categories.findOne({
      where: {
        id,
      },
    });
  }

  custom(params) {
    const { id } = params;
    return this.Categories.update(params, {
      where: {
        id,
      },
    });
  }

  delete(id) {
    return this.Categories.destroy({
      truncate: true,
      restartIdentity: true,
      where: {
        id,
      },
    });
  }
}

export default new CategoriesService();
