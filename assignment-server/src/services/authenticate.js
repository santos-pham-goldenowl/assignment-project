import { v4 as uuidv4 } from 'uuid';

class AuthenticateService {
  generateUserSecretKey() {
    return uuidv4();
  }
}

export default new AuthenticateService();