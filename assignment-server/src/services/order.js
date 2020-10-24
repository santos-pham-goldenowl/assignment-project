import Models from "@models";
import sequelize from "sequelize";

class OrderService {
  constructor() {
    this.OrdersModel = Models.Orders;
  }

  createOrder(params) {
    return this.OrdersModel.create(params);
  }

  getOrderListByUser(userId) {
    return this.OrdersModel.findAll({
      where: {
        userId,
      },
    });
  }

  getAllOrder(filter) {
    return this.OrdersModel.findAll(filter);
  }

  getById(id) {
    return this.OrdersModel.findOne({
      where: {
        id,
      },
      include: [{ model: Models.Users, as: "user", paranoid: false }],
    });
  }

  update(params) {
    delete params.lastname;
    const { id } = params;
    return this.OrdersModel.update(params, {
      where: {
        id,
      },
    });
  }

  find(params) {
    const { userName, orderStatus } = params;
    return this.OrdersModel.findAll({
      where: {
        status: orderStatus,
      },
      include: [
        {
          model: Models.Users,
          as: "user",
          paranoid: false,
          where: {
            lastName: sequelize.where(
              sequelize.fn("LOWER", sequelize.col("lastName")),
              "LIKE",
              userName.toLowerCase()
            ),
          },
        },
      ],
    });
  }
}

export default new OrderService();
