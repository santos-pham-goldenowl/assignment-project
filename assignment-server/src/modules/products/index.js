import { Router } from "express";
const router = new Router();
import Controller from "./controller";
import upload from "../../config/multer.config.js";

router.get("/category/:category", (req, res, next) => {
  return Controller.getCategoryList(req, res, next);
});

router.post("/add", upload.array("imageUrl"), (req, res, next) => {

  return Controller.createProduct(req, res, next);
});
router.post("/search", (req, res, next) => {
  return Controller.searchProduct(req, res, next);
});

router.post("/custom", upload.array("imageUrl"), (req, res, next) => {
  return Controller.customProduct(req, res, next);
});

router.post("/delete", (req, res, next) => {
  return Controller.deleteProduct(req, res, next);
});

router.get("/filter", (req, res, next) => {
  return Controller.getProductListByFilter(req, res, next);
});

router.post("/", (req, res, next) => {
  return Controller.createProduct(req, res, next);
});

router.get("/:id", (req, res, next) => {
  return Controller.getProduct(req, res, next);
});

router.get("/", (req, res, next) => {
  return Controller.getProductList(req, res, next);
});

export default router;
