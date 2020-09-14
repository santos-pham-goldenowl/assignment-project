const bcrypt = require("bcrypt");
import { UserService, AuthenticateService } from "@services";

class AuthenticateController {
  async signUp(req, res, next) {
    const { email, firstName, lastName, password, phone, avatarUrl } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserService.createUser({
      email,
      firstName,
      lastName,
      password: cryptedPassword,
      phone,
      avatarUrl,
    });

    // If we need user login imemediately. We can generate token here and send it back to the client
    return res.json({
      success: true,
      user: UserService.publicInformation(createdUser.dataValues),
    });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Missing required params.");
    }

    const u = await UserService.getUserByEmail(email);
    const isValidPassword = u.isValidPassword(password);

    if (!isValidPassword) {
      throw new Error("Wrong username or password");
    }
    const jwtInformation = {
      id: u.id,
    };

    const token = AuthenticateService.genereateJWTToken(jwtInformation);
    res.json({
      success: true,
      token,
    });
  }
}

export default new AuthenticateController();
