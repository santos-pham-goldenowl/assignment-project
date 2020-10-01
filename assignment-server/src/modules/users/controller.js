import { UserService } from "@services";

class UserController {
  async getUserProfile(req, res, next) {
    const existedUser = req.user;
    if (existedUser) {
      return res.json({
        success: true,
        result: UserService.publicInformation(existedUser),
      });
    }
  }
}

export default new UserController();
