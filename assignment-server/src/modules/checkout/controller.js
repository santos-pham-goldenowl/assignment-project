import Models from "@models";
import { OrderItemsService, OrderService } from "@services";

class CheckOutController {
  async postCheckout(req, res, next) {
    try {
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
    } catch (err) {
      next(err);
    }
  }

  // get checkout information
  async getOrderListByUserId(req, res, next) {
    try {
      const { userId } = req.params;

      if (userId) {
        const orders = await OrderService.getOrderListByUser(userId);
        res.json({
          success: true,
          orders,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getOrderList(req, res, next) {
    try {
      const filter = {
        include: [{ model: Models.Users, as: "user", paranoid: false }],
      };

      const orderList = await OrderService.getAllOrder(filter);

      res.json({
        success: true,
        orderList,
      });
    } catch (err) {
      next(err);
    }
  }

  async getDetailOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      if (orderId) {
        const orderItemsList = await OrderItemsService.getOrderItemList(
          orderId,
          {
            include: [
              {
                model: Models.Products,
                as: "product",
                paranoid: false,
              },
            ],
          }
        );

        res.json({
          success: true,
          result: orderItemsList,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;

      const order = await OrderService.getById(id);
      res.json({
        success: true,
        order,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const { values } = req.body;
      await OrderService.update(values);
      res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async findOrders(req, res, next) {
    try {
      const params = req.body;
      const orderList = await OrderService.find(params);

      res.json({
        success: true,
        orderList,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new CheckOutController();
