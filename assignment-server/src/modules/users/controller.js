import { UserService } from "@services";

class UserController {
  async getListUser(req, res, next) {
    try {
      const result = await UserService.getUsers();
      res.json({
        success: true,
        result,
      });
    } catch (err) {
      next(err);
    }
  }
  async getUserProfile(req, res, next) {
    try {
      const existedUser = req.user;
      if (existedUser) {
        return res.json({
          success: true,
          result: UserService.publicInformation(existedUser),
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.json({
        success: true,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { values } = req.body;
      await UserService.update(values);
      res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.body;

      await UserService.delete(id);
      const newUserList = await UserService.getUsers();
      res.json({
        success: true,
        newUserList,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
