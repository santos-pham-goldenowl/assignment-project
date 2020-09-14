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
export default router;
