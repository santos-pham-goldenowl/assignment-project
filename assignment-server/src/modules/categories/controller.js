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
      const { name } = req.body.values;
      console.log("matched: ", req.body);

      await CategoryService.createCategory({ name });
      res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async getCategoriesById(req, res, next) {
    try {
      const { id } = req.params;
      if (id) {
        const category = await CategoryService.getCategory(id);
        res.json({
          success: true,
          category,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async customCategory(req, res, next) {
    try {
      const { values } = req.body;
      const category = await CategoryService.custom(values);

      res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.body;

      await CategoryService.delete(id);
      const results = await CategoryService.getCategoryList();
      return res.json({
        success: true,
        results,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
