import Models from "@models";

class UserService {
  constructor() {
    this.UserModel = Models.Users;
  }
  createUser(params) {
    return this.UserModel.create(params);
  }

  // - remove sensitive information before sending back data to client
  publicInformation(user) {
    // delete user.secretKey;
    // delete user.password;
    const { password, secretKey, ...restUserData } = user.dataValues || user;
    return {
      restUserData,
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
