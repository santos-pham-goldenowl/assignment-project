import Models from "@models";

class OrderItemsService {
  constructor() {
    this.OrderItemsModel = Models.OrderItems;
  }
  createOrderItems(params) {
    return this.OrderItemsModel.create(params);
  }

  getOrderItemList(id, options) {
    const filter = {
      where: {
        orderId: +id,
      },
      ...options,
    };

    return this.OrderItemsModel.findAll(filter);
  }
}

export default new OrderItemsService();
