import Models from "@models";
import { OrderItemsService, OrderService, ProductService } from "@services";

class CheckOutController {
  async postCheckout(req, res, next) {
    const checkoutInfor = req.body.data;
    const { orderList, userId } = checkoutInfor.list;
    //
    const amount = orderList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.count;
    }, 0);
    const orderInfor = {
      userId,
      totalAmount: amount,
      status: "pending",
    };
    const order = await OrderService.createOrder(orderInfor);
    const orderId = order.dataValues.id;
    //
    orderList.forEach((element) => {
      const amount = element.count * element.price;
      const orderItemList = {
        orderId,
        productId: element.id,
        quantity: element.count,
        price: element.price,
        amount,
      };
      OrderItemsService.createOrderItems(orderItemList);
    });

    res.json({
      success: true,
    });
  }

  // get checkout information
  async getCheckout(req, res, next) {
    const { userid } = req.headers;
    if (userid) {
      const orders = await OrderService.getOrderListByUser(userid);
      res.json({
        success: true,
        orders,
      });
    }
  }

  async getDetailOrder(req, res, next) {
    const { orderId } = req.params;
    if (orderId) {
      const orderItemsList = await OrderItemsService.getOrderItemList(orderId, {
        include: [
          {
            model: Models.Products,
            as: "product",
          },
        ],
      });

      res.json({
        success: true,
        result: orderItemsList,
      });
    }
  }
}

export default new CheckOutController();
