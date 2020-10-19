import { Router } from "express";
import trycatchWrapper from "@utils/trycatchWrapper";
import Controller from "./controller";

const router = new Router();
router.get(
  "/profile",
  trycatchWrapper(async (req, res, next) => {
    return Controller.getUserProfile(req, res, next);
  })
);

router.get("/:id", (req, res, next) => {
  return Controller.getUser(req, res, next);
});

router.post("/custom", (req, res, next) => {
  return Controller.updateUser(req, res, next);
});

router.post("/delete", (req, res, next) => {
  return Controller.deleteUser(req, res, next);
});

router.get(
  "/",
  trycatchWrapper(async (req, res, next) => {
    return Controller.getListUser(req, res, next);
  })
);

export default router;
