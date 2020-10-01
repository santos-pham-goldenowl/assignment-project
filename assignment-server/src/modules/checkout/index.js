import { Router } from "express";
const router = new Router();
import CheckOutController from "./controller";

router.post("/", (req, res, next) => {
  return CheckOutController.postCheckout(req, res, next);
});

router.get("/order-detail/:orderId", (req, res, next) => {
  return CheckOutController.getDetailOrder(req, res, next);
});

router.get("/", (req, res, next) => {
  return CheckOutController.getCheckout(req, res, next);
});

export default router;
