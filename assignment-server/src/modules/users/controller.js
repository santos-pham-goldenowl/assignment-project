import { UserService } from '@services';

class UserController {
  async getUserProfile(req, res, next) {
    const existedUser = req.user;

    return res.json({
      success: true,
      data: UserService.publicInformation(existedUser.dataValues)
    });
  }
}

export default new UserController;