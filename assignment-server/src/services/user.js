import Models from '@models';

class UserService {
  constructor() {
    this.UserModel = Models.Users;
  }
  createUser(params) {
    return this.UserModel.create(params);
  }

  publicInformation(user) {
    delete user.secretKey;
    return {
      ...user,
    }
  }
}

export default new UserService();