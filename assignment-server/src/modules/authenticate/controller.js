const bcrypt = require("bcrypt");
import { UserService, AuthenticateService } from "@services";

class AuthenticateController {
  async signUp(req, res, next) {
    const { email, firstName, lastName, password, phone, avatarUrl } = req.body;
    const user = UserService.getUserByEmail(email);

    // - Throw a new error if email already exist
    if (user) {
      throw new Error("This Email already exist");
    }

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
    if (!u) {
      throw new Error("Wrong username or password");
    }

    const isValidPassword = await u.isValidPassword(password);
    console.log("isValidPw: ", isValidPassword);
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
      userName: u.lastName,
    });
  }
}

export default new AuthenticateController();
