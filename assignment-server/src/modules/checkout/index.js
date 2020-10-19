import { Router } from "express";
const router = new Router();
import CheckOutController from "./controller";

router.post("/", (req, res, next) => {
  return CheckOutController.postCheckout(req, res, next);
});

router.post("/update", (req, res, next) => {
  console.log("matched");
  return CheckOutController.updateOrder(req, res, next);
});

router.get("/order-detail/:orderId", (req, res, next) => {
  return CheckOutController.getDetailOrder(req, res, next);
});

router.get("/user/:userId", (req, res, next) => {
  return CheckOutController.getOrderListByUserId(req, res, next);
});

router.post("/search", (req, res, next) => {
  return CheckOutController.findOrders(req, res, next);
});

router.get("/:id", (req, res, next) => {
  return CheckOutController.getOrderById(req, res, next);
});

router.get("/", (req, res, next) => {
  return CheckOutController.getOrderList(req, res, next);
});

export default router;
