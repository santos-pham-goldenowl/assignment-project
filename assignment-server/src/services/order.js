import Models from "@models";

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

  // getOrderById(id) {
  //   return this.OrdersModel.findOne({
  //     where: {
  //       userId: id,
  //     },
  //   });
  // }
}

export default new OrderService();
