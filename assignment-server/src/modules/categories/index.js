import { Router } from "express";
import Controller from "./controller";

const router = new Router();

router.post("/custom", (req, res, next) => {
  return Controller.customCategory(req, res, next);
});

router.post("/delete", (req, res, next) => {
  return Controller.deleteCategory(req, res, next);
});

router.get("/:id", (req, res, next) => {
  return Controller.getCategoriesById(req, res, next);
});

router.post("/", (req, res, next) => {
  return Controller.postCategories(req, res, next);
});

router.get("/", (req, res, next) => {
  return Controller.getCategories(req, res, next);
});

export default router;
