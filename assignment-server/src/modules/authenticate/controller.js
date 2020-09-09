import { UserService } from '@services';

class AuthenticateController {
  async signUp(req, res, next) {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const createdUser = await UserService.createUser({ email, firstName, lastName });

    return res.json({
      success: true,
      user: UserService.publicInformation(createdUser.dataValues),
    });
  }
}

export default new AuthenticateController();