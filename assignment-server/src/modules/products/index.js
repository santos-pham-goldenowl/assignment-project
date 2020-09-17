import { Router } from "express";
const router = new Router();
import Controller from "./controller";

router.get("/category/:category", (req, res, next) => {
  return Controller.getCategoryList(req, res, next);
});
router.get("/:id", (req, res, next) => {
  return Controller.getProduct(req, res, next);
});

router.get("/", (req, res, next) => {
  return Controller.listProducts(req, res, next);
});
router.post("/", (req, res, next) => {
  return Controller.createProduct(req, res, next);
});

export default router;
