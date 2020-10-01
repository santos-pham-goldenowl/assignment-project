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
}

export default new CategoriesService();
