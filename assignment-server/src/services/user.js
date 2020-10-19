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

  update(params) {
    const { id } = params;
    console.log("params: ", params);
    // const { email, firstname, lastname, phone, avatarUrl, role } = params;
    // const newUpdateUser = {
    //   id,
    //   password: "DEFAULT",
    //   email,
    //   firstname,
    //   lastname,
    //   phone,
    //   avatarUrl,
    //   role,
    // };
    // console.log("newList: ", newUpdateUser);
    return this.UserModel.update(params, {
      where: {
        id,
      },
      field: ["id", "firstname", "lastname", "phone", "avatarUrl", "role"],
    });
  }

  delete(id) {
    return this.UserModel.destroy({
      where: {
        id,
      },
    });
  }
}

export default new UserService();
