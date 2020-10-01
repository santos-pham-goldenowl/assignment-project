import { Router } from "express";
import Controller from "./controller";

const router = new Router();

router.post("/", (req, res, next) => {
  console.log("post");
  return Controller.postCategories(req, res, next);
});

router.get("/", (req, res, next) => {
  return Controller.getCategories(req, res, next);
});

export default router;
