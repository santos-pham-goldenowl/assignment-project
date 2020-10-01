import Models from "@models";
import { CategoryService } from "@services";

class CategoryController {
  // - get categories
  async getCategories(req, res, next) {
    try {
      const results = await CategoryService.getCategoryList();

      res.json({
        success: true,
        results,
      });
    } catch (err) {
      next(err);
    }
  }

  // - post category
  async postCategories(req, res, next) {
    try {
      const { category } = req.body.values;
      await CategoryService.createCategory({ name: category });
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
