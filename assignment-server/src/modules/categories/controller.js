import Models from '@models';

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const results = await Models.Categories.findAll();

      res.json({
        success: true,
        results,
      });
    } catch(err) {
      next(err);
    }
  }
}

export default new CategoryController();