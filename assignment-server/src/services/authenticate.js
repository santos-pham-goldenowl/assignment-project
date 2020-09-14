import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET_KEY;
class AuthenticateService {
  generateUserSecretKey() {
    return uuidv4();
  }

  genereateJWTToken(info) {
    return jwt.sign(info, SECRET_KEY);
  }
}

export default new AuthenticateService();
