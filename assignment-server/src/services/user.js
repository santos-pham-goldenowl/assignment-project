import Models from "@models";

class UserService {
  constructor() {
    this.UserModel = Models.Users;
  }
  createUser(params) {
    return this.UserModel.create(params);
  }

  publicInformation(user) {
    // delete user.secretKey;
    // delete user.password;
    const { password, secretKey, ...rest } = { ...user };
    return {
      // ...user,
      rest,
    };
  }

  getUsers(filter) {
    return this.UserModel.findAll(filter);
  }

  getUserByEmail(email) {
    return this.UserModel.findOne({
      where: {
        email,
      },
    });
  }

  getUserById(id) {
    return this.UserModel.findOne({
      where: {
        id,
      },
    });
  }
}

export default new UserService();
